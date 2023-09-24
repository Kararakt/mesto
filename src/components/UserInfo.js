export class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameSelector = document.querySelector(nameSelector);
    this._jobSelector = document.querySelector(jobSelector);
    this._avatarSelector = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const user = {
      title: this._nameSelector.textContent,
      job: this._jobSelector.textContent,
    };
    return user;
  }

  setUserInfo(userInfo) {
    this._nameSelector.textContent = userInfo.name;
    this._jobSelector.textContent = userInfo.about;
    this._avatarSelector.style.backgroundImage = `url(${userInfo.avatar})`;
  }

  getUserId(userId) {
    return userId;
  }
}
