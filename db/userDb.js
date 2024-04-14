export class UserDb {
  /*
  {
    loggedIn: boolean,
    stream: {
      title: string,
      startDate: string,
      streamRate: number,
      discussionUrl: string
    },
    maxHints: number,
    maxBugs: number,
    problems: id: {
      hints: number, 
      bugs: number, 
      time: number, 
      solutionType: number, 
      score: number, 
      solutionUrl: string, 
      note: string
    }{}
  }
  */
  static data = JSON.parse(localStorage.getItem("stored")) || {
    loggedIn: false,
    stream: null,
    maxHints: 0,
    maxBugs: 0,
    problems: {},
  };

  static get() {
    return UserDb.data;
  }

  static set(data) {
    UserDb.data = data;
    localStorage.setItem("stored", JSON.stringify(data));
  }

  static clear() {
    UserDb.data = { maxHints: 0, maxBugs: 0, problems: [] };
    localStorage.setItem("stored", JSON.stringify(UserDb.data));
  }
}
