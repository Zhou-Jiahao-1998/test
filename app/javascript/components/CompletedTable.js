import React, { Component } from "react";
import axios from "axios";
import Display from "./Display";
import Edit from "./Edit";
import Tagging from "./Tagging";

class CompletedTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
    this.getItems();
  }

  getItems() {
    axios
      .get("/api/v1/items")
      .then((response) => {
        this.setState({ items: response.data });
      })
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    this.getItems();
  }

  deleteItem(id) {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      axios.delete(`/api/v1/items/${id}`);
      window.location.reload(false);
    }
  }

  render() {
    return (
      <>
        <h1>Completed Items</h1>
        <div>
          <table class="table">
            <thead class="thead-light">
              <tr>
                <th>Date(DD/MM/YYYY)</th>
                <th>Time</th>
                <th>Title </th>
                <th>Tag</th>
                <th>Done?</th>
                <th colspan="3"></th>
              </tr>
            </thead>

            {this.state.items
              .reverse()
              .filter((item) => item.Done == true)
              .map((item) => {
                return (
                  <>
                    <tbody>
                      <td>
                        {item.Date.substr(8, 2)}/{item.Date.substr(5, 2)}/
                        {item.Date.substr(0, 4)}
                      </td>
                      <td>{item.Time.substr(11, 5)}</td>
                      <td>
                        <Display
                          title={item.Title}
                          number={item.id.toString()}
                        />
                      </td>
                      <td>
                        <Tagging label={item.Tag} />
                      </td>
                      <td>{item.Done.toString()}</td>
                      <td>
                        <Edit number={item.id} />
                      </td>
                      <td>
                        <a
                          class="btn btn-outline-danger"
                          role="button"
                          onClick={() => this.deleteItem(item.id)}
                        >
                          Delete
                        </a>
                      </td>
                    </tbody>
                  </>
                );
              })}
          </table>
        </div>
      </>
    );
  }
}

export default CompletedTable;
