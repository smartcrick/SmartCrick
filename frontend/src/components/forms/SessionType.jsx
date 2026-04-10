const SessionType = ({ setSessionType, next }) => {
  return (
    <div>
      <h2>Session Type</h2>
      <button onClick={() => { setSessionType("match"); next(); }}>Match</button>
      <button onClick={() => { setSessionType("practice"); next(); }}>Practice</button>
    </div>
  );
};

export default SessionType;
