from analysis.utils import generate_analysis
from performance.models import Goal


def generate_recommendations(user):
    analysis = generate_analysis(user)
    goals = Goal.objects.filter(user=user)

    weaknesses = analysis.get("weaknesses", [])

    recommendations = []

    for w in weaknesses:

        if "short ball" in w.lower():
            recommendations.append({
                "weakness": w,
                "solution": [
                    "Practice pull and hook shots daily",
                    "Use bowling machine for bouncers",
                    "Improve backfoot positioning",
                    "Watch professional batting techniques"
                ]
            })

        if "yorker" in w.lower():
            recommendations.append({
                "weakness": w,
                "solution": [
                    "Practice yorker drills with cones",
                    "Focus on release timing",
                    "Train under pressure scenarios",
                    "Improve run-up consistency"
                ]
            })

    # Add goal-based recommendations
    for g in goals:
        if "strike rate" in g.improvement_area.lower():
            recommendations.append({
                "weakness": "Low Strike Rate",
                "solution": [
                    "Practice power hitting",
                    "Work on shot selection",
                    "Improve fitness for faster running"
                ]
            })

    return recommendations