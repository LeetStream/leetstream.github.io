import { Component } from "./Component.js";

class NewStream extends Component {
  render() {
    return /*HTML*/ `
      <style>
        .pg-title {
          text-align: center;
          margin-bottom: 32px;
        }

        .new-stream-form>div {
          display: flex;
          flex-direction: column;
          gap: 32px;
          max-width: 70ch;
        }

        .new-stream-form .submit {
          align-self: center;
        }

        .new-stream-form input, .new-stream-form input[type="number"]{
          flex-grow: 1;
          width: 100%;
        }
      </style>

      <h1 class="pg-title">Create your Stream 🌊</h1>

      <form class="new-stream-form" action="#joinStream">
        <div>
          <div class="labeled-input">
            <label for="title">Title</label>
            <input type="text" name="title" id="title" required>
          </div>
        
          <div class="labeled-input">
            <label for="start-date">Start Date (Africa/Cairo time)</label>
            <input type="date" name="start-date" id="start-date" required>
          </div>

          <div class="labeled-input">
            <label for="stream-rate">Stream Rate (problems per day)</label>
            <input type="number" name="stream-rate" id="stream-rate" disabled placeholder="1">
          </div>

          <div class="labeled-input">
            <label for="discussion-url">Discussion Group URL (e.g., WhatsApp, Telegram, Discord, etc.)</label>
            <input type="url" name="discussion-url" id="discussion-url" required>
          </div>

          <button class="submit" id="create-stream">Create Stream</button>
        </div>
      </form>
    `;
  }
}

customElements.define("new-stream", NewStream);
