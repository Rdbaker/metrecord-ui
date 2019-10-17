import React, { Component, Fragment } from 'react';
import { OrgsAPI } from 'api/org';
import './style.css';

const getNamespacedPropertyValue = (orgData, name, namespace) => {
  if (!name) return false;
  if (!orgData) return false;
  if (!orgData.properties.length) return false;
  const prop = orgData.properties.find(property => property.namespace === namespace && property.name === name);
  return prop && prop.value;
}

const hasGate = (orgData, gateName) => getNamespacedPropertyValue(orgData, gateName, 'OrgPropertyNamespaces.GATES');
const getSettingValue = (orgData, settingName) => getNamespacedPropertyValue(orgData, settingName, 'SETTINGS');
const getThemeValue = (orgData, themeName) => getNamespacedPropertyValue(orgData, themeName, 'OrgPropertyNamespaces.THEME');


class AccountSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orgData: null,
      allowedDomainInput: '',
    };
  }

  componentDidMount() {
    this.doFetchMyOrg();
  }

  doFetchMyOrg = async () => {
    const response = await OrgsAPI.getMyOrg();
    const { data } = await response.json();
    this.setState({
      orgData: data,
      chatButtonColor: getSettingValue(data, 'chatButtonColor'),
      updateFailed: false,
      updateSuccess: false,
    });
  }

  doSave = async () => {
    const {
      chatButtonColor,
    } = this.state;

    try {
      OrgsAPI.updateThemeProperty('chatButtonColor', chatButtonColor);
      this.setState({
        updateFailed: false,
        updateSuccess: true,
      });
      setTimeout(this.unsetSuccessState, 3000);
    } catch (e) {
      this.setState({
        updateFailed: true,
        updateSuccess: false,
      });
      setTimeout(this.unsetFailState, 3000);
    }
  }


  onSubmit = e => {
    e.preventDefault();
    this.doSave();
  }

  unsetSuccessState = () => this.setState({ updateSuccess: false })
  unsetFailState = () => this.setState({ updateFailed: false })
  onAppNameChange = e => this.setState({ appName: e.target.value })
  onTextMsgChange = e => this.setState({ textLoginMessage: e.target.value })
  onEmailLinkChange = e => this.setState({ emailMagiclink: e.target.value })
  onToggleSmsLogin = e => this.setState({ smsLoginEnabled: e.target.checked })
  onToggleGoogleLogin = e => this.setState({ googleLoginEnabled: e.target.checked })
  onGoogleClientIdChange = e => this.setState({ googleClientId: e.target.value })
  onAllowedDomainInputChange = e => this.setState({ allowedDomainInput: e.target.value })
  onDomainKeyDown = e => {
    if (e.keyCode == 13) {
      this.setState(prevState => ({
        allowedDomains: prevState.allowedDomains.concat([ prevState.allowedDomainInput ]),
        allowedDomainInput: '',
      }))
      e.preventDefault();
    }
  }
  removeDomain = index => {
    this.setState(prevState => ({
      allowedDomains: prevState.allowedDomains.slice(0, index).concat(prevState.allowedDomains.slice(index + 1))
    }))
  }

  renderDomainHelperText = () => {
    const {
      allowedDomains,
    } = this.state;

    return (
      <div>
        <div>If you add domains here, Weasl will only be allowed to run on the provided domains. Otherwise, Weasl can run everywhere.</div>
        <div>Press enter to add another domain when editing, or press the small X to remove an added domain.</div>
        <div>Domains need to be in the format: www.website.com or website.com</div>
        {allowedDomains && allowedDomains.map((domain, i) => (
          <div key={domain}>{domain} <span className="domain-remove-x" onClick={() => this.removeDomain(i)}>&times;</span></div>
        ))}
      </div>
    )
  }

  render() {
    const {
      orgData,
      updateFailed,
      updateSuccess,
      chatButtonColor = 'blue',
    } = this.state;

    return (
      <div className="account-settings-form-container">
        <p>
            Welcome to your settings! Here you can update information related to your Agora chat.
        </p>
        {!!orgData &&
          <div>
            {updateFailed && <div className="form-notification-update-failed">The update failed</div>}
            {updateSuccess && <div className="form-notification-update-success">Update successful!</div>}
            <form className="wsl-form" onSubmit={this.onSubmit}>
              <input value={chatButtonColor} />
              <button type="submit" onClick={this.onSubmit}>Save</button>
            </form>
          </div>
        }
        {!orgData &&
          <div>Loading your settings</div>
        }
      </div>
    );
  }
}

export default AccountSettings;
