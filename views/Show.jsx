const React = require("react");

class Show extends React.Component {
  render() {
    const log = this.props.log;
    console.log("🚀 ~ file: Show.jsx:6 ~ Show ~ render ~ log:", log);
    return (
      <div>
        <h1>{log.title}</h1>
        <h3>Created : {log.createdAt.toLocaleString()}</h3>
        <h5>Updated : {log.updatedAt.toLocaleString()}</h5>
        <p>{log.entry}</p>
        {log.shipIsBroken ? (
          <span>Ship is damage</span>
        ) : (
          <span>Ship is doing well</span>
        )}
        <br />
        <a href="/index">Back</a>
      </div>
    );
  }
}

module.exports = Show;
