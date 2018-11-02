
("use strict");

const e = React.createElement;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handlePost = this.handlePost.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.checkStatus = this.checkStatus.bind(this);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  handleUpdate() {
    fetch("http://127.0.0.1:8000/api/")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      $(".alert").hide();
      this.handleUpdate();
    } else {
      $(".alert").show();
      var error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }

  handlePost() {
    var form = document.querySelector("post_submit");
    fetch("http://127.0.0.1:8000/api/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: $("#title").val(),
        text: $("#text").val()
      })
    }).then(this.checkStatus);
  }

  componentDidMount() {
    this.handleUpdate();
  }

  render() {
    const { error, isLoaded, items } = this.state;

    return (
      <div className="App">
        <nav className="navbar sticky-top">
          <a className="navbar-brand a" href="#">
            YOUR BEST BLOG!
          </a>
        </nav>

        <div id="main" className="flex-container">
          <div className="row">
            <div className="col-sm">
              <h3>The blog page! </h3>
              <form id="post_submit">
                <div className="form-group">
                  <label htmlFor="title">Title for your post:</label>
                  <input
                    type="text"
                    style={{ maxlength: 140 }}
                    placeholder="Title"
                    className="form-control"
                    id="title"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="text" value="">
                    Type content here:
                  </label>
                  <textarea
                    className="form-control"
                    id="text"
                    placeHolder="Type content over here"
                  />
                </div>
                <div className="text-center">
                  <button
                    id="btn_submit"
                    type="button"
                    className="btn btn-primary"
                    onClick={this.handlePost}
                  >
                    Submit me
                  </button>
                </div>
                <div
                  className="alert alert-warning"
                  style={{
                    display: "none",
                    margin: 20
                  }}
                >
                  <strong>Attention!</strong> Sended request wasn't allowed by
                  server. Probably it's empty!
                </div>
              </form>
            </div>
            <div className="col-sm">
              <p style={{ fontSize: 20 }}>
                <span style={{ color: "red" }}> Hi there. </span>
                I've created this blog-page mostly on learning purposes. Whole
                page content is rendered in DOM by ReactJS. I understand that
                React part isn't the best programming decision ever made, but
                i'll make it better. I had 2 more branches of development: i've
                tried making refresh based on websockets (django_socketio) and
                separate elements in ReactJS( make Form and Feed classes, and
                make them communicating in upper App class). But both cases
                where harder to implement and i couldn't make them working good
                on limited time.
              </p>

              <div className="text-center">
                <button
                  id="btn_refresh"
                  className="btn btn-info"
                  onClick={this.handleUpdate}
                >
                  Refresh your feed
                </button>
              </div>
            </div>
            <div className="col-12">
              <div className="Posts">
                <div id="postfeed" />

                {items.map(item => (
                  <div key={item.id} id={item.id} className="post">
                    <div className="post_title">{item.title}</div>
                    <div className="post_date">{item.created}</div>
                    <div className="post_text">{item.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const domContainer = document.querySelector("#root");
ReactDOM.render(e(App), domContainer);
