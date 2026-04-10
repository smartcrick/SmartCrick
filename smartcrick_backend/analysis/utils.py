from performance.models import Performance


def generate_analysis(user):
    data = Performance.objects.filter(user=user)

    total_runs = 0
    total_balls = 0
    total_matches = data.count()

    total_wickets = 0
    total_overs = 0
    total_runs_conceded = 0

    weaknesses = []

    for d in data:
        # Batting
        if d.runs:
            total_runs += d.runs
        if d.balls:
            total_balls += d.balls

        # Bowling
        if d.wickets:
            total_wickets += d.wickets
        if d.overs:
            total_overs += d.overs
        if d.runs_conceded:
            total_runs_conceded += d.runs_conceded

        # Weakness rules
        if d.short_ball_success is not None and d.short_ball_success < 40:
            weaknesses.append("Weak against short ball")

        if d.yorker_accuracy is not None and d.yorker_accuracy < 40:
            weaknesses.append("Poor yorker accuracy")

    # Calculations
    avg_runs = total_runs / total_matches if total_matches else 0
    strike_rate = (total_runs / total_balls * 100) if total_balls else 0

    avg_wickets = total_wickets / total_matches if total_matches else 0
    economy = (total_runs_conceded / total_overs) if total_overs else 0

    return {
        "avg_runs": avg_runs,
        "strike_rate": strike_rate,
        "avg_wickets": avg_wickets,
        "economy": economy,
        "weaknesses": list(set(weaknesses)),
    }