import { Component } from "./Component.js";
import { sanitizeInput } from "../utils.js";
import { UserDb } from "../db/userDb.js";

class JoinStream extends Component {
  constructor() {
    super();

    this.querySelector("#join-stream").addEventListener("click", () => {
      let stored = UserDb.get();

      if (
        stored.loggedIn &&
        !confirm(
          `YOUR PROGRESS WILL BE LOST. Are you sure you want to log out from ${stored.stream.title} stream?`
        )
      )
        return;

      UserDb.clear();
      stored = UserDb.get();
      stored.loggedIn = true;
      stored.stream = {
        title: this.title,
        startDate: this.startDate,
        streamRate: this.streamRate,
        discussionUrl: this.discussionUrl,
      };
      UserDb.set(stored);
      location.hash = "";
      location.reload();
    });

    if (new Date(this.startDate) > new Date()) {
      this.querySelector("#join-stream").disabled = true;
      this.querySelector("#join-stream").innerText = "Stream not started yet";
    }
  }
  render() {
    let url = new URL(window.location.href);

    this.title = sanitizeInput(url.searchParams.get("title"));
    this.streamRate = sanitizeInput(url.searchParams.get("stream-rate") || "1");
    this.startDate = sanitizeInput(url.searchParams.get("start-date"));
    this.discussionUrl = sanitizeInput(url.searchParams.get("discussion-url"));
    url = sanitizeInput(url.toString());

    return /*HTML*/ `
      <style>
        join-stream>table {
          margin: 0 auto;
          max-width: 70ch;
          font-size: 1.2rem;    
        }

        join-stream>table>thead>th>h1 {
          text-align: center;
        }

        join-stream>table>tbody>tr>td {
          padding: .5rem 0;
        }

        join-stream {
          padding: 1rem;
        }

        join-stream .submit {
          display: block;
          margin: 1rem auto;
        }

        #join-stream:disabled {
          background-image: linear-gradient(319deg, #bbb 0%, #727272 37%, #1f1f1f 100%);
          cursor: not-allowed;
        }
      </style>
      <table>
        <thead>
          <th colspan="2">
            <h1>Do you want to join ${this.title} stream 🌊?</h1>
          </th>
        </thead>
        <tbody>
          <tr>
            <td>
              Stream Title
            </td>
            <td>
              ${this.title}
            </td>
          </tr>
          <tr>
            <td>
              Stream URL
            </td>
            <td>
              <a href="${url}">${url}</a>
            </td>
          </tr> 
          <tr>
            <td>
              Stream Rate
            </td>
            <td>
              ${this.streamRate}
            </td>
          </tr>
          <tr>
            <td>
              Start Date (Africa/Cairo time)
            </td>
            <td>
              ${this.startDate}
            </td>
          </tr>
          <tr>
            <td>
              Discussion Group URL
            </td>
            <td>
              <a href="${this.discussionUrl}">${this.discussionUrl}</a>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2">
              <button class="submit" id="join-stream">Join Stream</button>
            </td>
          </tr>
        </tfoot>
      </table>
    `;
  }
}

customElements.define("join-stream", JoinStream);
