import React, { Component } from 'react';
import { OrgsAPI } from 'api/org';


class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editingGateName: '',
      gateOrgId: 1,
      gateValue: true,
      updatingGate: false,
      gateEditSuccess: false,
      gateEditFailed: false,
    };
  }

  patchGate = async (e) => {
    const {
      editingGateName,
      gateValue,
      gateOrgId,
    } = this.state;
    e.preventDefault();

    this.setState({
      updatingGate: true,
    });

    const response = await OrgsAPI.patchGate(gateOrgId, editingGateName, gateValue);
    const { data } = await response.json();

    if (data) {
      this.setState({
        gateEditSuccess: true,
      });
    } else {
      this.setState({
        gateEditFailed: true,
      });
    }

    this.setState({
      updatingGate: false,
    });
  }

  onGateNameChange = e => this.setState({ editingGateName: e.target.value })
  onOrgIdChange = e => this.setState({ gateOrgId: Number(e.target.value) })
  onToggleGateEnbled = e => this.setState({ gateValue: e.target.checked })

  render() {
    const {
      editingGateName,
      gateValue,
      gateOrgId,
      updatingGate,
      gateEditSuccess,
      gateEditFailed,
    } = this.state;

    return (
      <div>
        {updatingGate && <div>Updating</div>}
        {!updatingGate && gateEditSuccess && <div>Gate updated successfully!</div>}
        {!updatingGate && gateEditFailed && <div>Gate update failed</div>}
        <form className="wsl-form" onSubmit={this.patchGate}>
          <label>
            Org ID
          </label>
          <button type="submit" onClick={this.patchGate}>Save</button>
        </form>
      </div>
    )
  }
}

export default Admin;