const React = require("react");

class New extends React.Component {
  render() {
    return (
      <form action="/logs" method="POST">
        Title : <input type="text" name="title" />
        <br />
        Entry :<input type="textarea" name="entry" />
        <br />
        Ship Status : <input type="checkbox" name="shipIsBroken" />
        <br />
        <input type="submit" value="submit" />
      </form>
    );
  }
}

module.exports = New;
