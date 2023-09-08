export class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameSelector = document.querySelector(nameSelector);
    this._jobSelector = document.querySelector(jobSelector);
  }

  getUserInfo() {
    const user = {
      title: this._nameSelector.textContent,
      job: this._jobSelector.textContent,
    };
    return user;
  }

  setUserInfo(userInfo) {
    this._nameSelector.textContent = userInfo.title;
    this._jobSelector.textContent = userInfo.job;
  }
}
