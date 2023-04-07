const React = require("react");

const flex = {
  display: `flex`,
  marginTop: `.5rem`,
  marginBottom: `.5rem`,
  gap: `1.5rem`,
};
class Index extends React.Component {
  render() {
    const log = this.props.log;
    return (
      <div>
        <a href="/index/new">Create</a>
        <hr />
        <ul>
          {log.map((elem) => {
            console.log(
              "🚀 ~ file: Index.jsx:10 ~ Index ~ {log.map ~ elem:",
              elem
            );
            return (
              <li key={elem._id}>
                <a href={`/index/${elem._id}`}>
                  <span>Title : {elem.title}</span>
                  <br />
                  <span>Entry : {elem.entry}</span>
                  <br />
                  <span>
                    Ship Status :{" "}
                    {elem.shipIsBroken
                      ? "Ship has taken damage"
                      : "No Damage to report."}
                  </span>
                </a>
                <br />
                <div style={flex}>
                  <a href={`/index/${elem._id}/edit`}>Edit</a>
                  <form
                    action={`/index/${elem._id}?_method=DELETE`}
                    method="POST"
                  >
                    <input type="submit" value="delete" />
                  </form>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

module.exports = Index;
