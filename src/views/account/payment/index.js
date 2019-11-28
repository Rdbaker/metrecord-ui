import React, { Component } from 'react';
import { StripeProvider, Elements, injectStripe, CardElement } from 'react-stripe-elements';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/pro-regular-svg-icons';
import cx from 'classnames';
import { pathOr } from 'ramda';

import Button from 'components/shared/Button';
import { STRIPE_PUBLIC_KEY } from 'constants/resources';
import { anyUserHasPaymentInfo } from 'modules/user/selectors';

import './style.css';
import Modal from 'components/shared/Modal/index';
import { UsersAPI } from 'api/users';
import { OrgsAPI } from 'api/org';
import { subscriptionPlanId } from 'modules/org/selectors';


const Plans = {
  plan_GGOUZrL6sTHiXE: {
    name: 'Premium',
  },
  [undefined]: {
    name: 'Free',
  },
  [null]: {
    name: 'Free',
  },
};

const PlanIdsToNames = {
  plan_GGOUZrL6sTHiXE: 'PREMIUM',
};


class PaymentSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPaymentModal: false,
      savingPaymentInfo: false,
      paymentInfoSaved: false,
      savePaymentFailed: false,
      savePaymentErr: null,
      showConfirmPlanChangeModal: false,
      confirmPlanId: null,
    };
  }

  onChangePlan = (planId) => {
    const {
      myPlanId,
    } = this.props;

    if (myPlanId === planId) return

    this.setState({ showConfirmPlanChangeModal: true, confirmPlanId: planId });
  }

  onConfirmPlan = async (e) => {
    e.preventDefault();
    const {
      confirmPlanId,
    } = this.state;

    this.setState({
      savingPlanChange: true,
    });

    try {
      await OrgsAPI.updatePlan(confirmPlanId);
      this.setState({
        savingPlanChange: false,
        changePlanFailed: false,
        planChangeSaved: true,
      }, () => setTimeout(this.unsetPlanChangeSuccess, 2000));
    } catch (e) {
      this.setState({
        changePlanErr: e,
        changePlanFailed: true,
        savingPlanChange: false,
      });
    }

  }

  handlePaymentUpdateSubmit = e => {
    const {
      stripe,
    } = this.props;

    e.preventDefault();

    stripe
      .createToken()
      .then(this.saveStripeToken)
  }

  saveStripeToken = async ({ token: { id }}) => {
    this.setState({
      savingPaymentInfo: true,
    });

    try {
      await UsersAPI.updateMyPaymentInfo(id);
      this.setState({
        savePaymentFailed: false,
        savingPaymentInfo: false,
        paymentInfoSaved: true,
      }, () => setTimeout(this.unsetPaymentSaveSuccess, 2000));
    } catch (e) {
      this.setState({
        savePaymentErr: e,
        savePaymentFailed: true,
        savingPaymentInfo: false,
      });
    }
  }

  unsetPaymentSaveSuccess = () => {
    this.setState({
      paymentInfoSaved: false,
      showPaymentModal: false,
    });
  }

  unsetPlanChangeSuccess = () => {
    this.setState({
      planChangeSaved: false,
      showConfirmPlanChangeModal: false,
    });
  }


  renderPaymentModal() {
    const {
      showPaymentModal,
      savingPaymentInfo,
      paymentInfoSaved,
      savePaymentFailed,
    } = this.state;

    return (
      <Modal isOpen={showPaymentModal} onClose={() => this.setState({ showPaymentModal: false })} title="Add payment information">
        <form className="payment-modal-form" onSubmit={this.handlePaymentUpdateSubmit}>
          <CardElement />
          <Button type="submit" disabled={savingPaymentInfo} loading={savingPaymentInfo} className="payment-modal-submit-button">Save</Button>
          <div className={cx("payment-info-save-success-message", { hidden: !paymentInfoSaved })}>Payment info saved successfully!</div>
          <div className={cx("payment-info-save-failed-message", { hidden: !savePaymentFailed })}>Payment info could not be saved. Please try again or contact support</div>
        </form>
      </Modal>
    );
  }

  renderPlanChangeConfirmModal() {
    const {
      showConfirmPlanChangeModal,
      confirmPlanId,
      savingPlanChange,
      planChangeSaved,
      changePlanFailed,
    } = this.state;

    const cancelChange = () => {
      this.setState({
        confirmPlanId: null,
        showConfirmPlanChangeModal: false,
      });
    }

    return (
      <Modal isOpen={showConfirmPlanChangeModal} onClose={() => this.setState({ showConfirmPlanChangeModal: false })} title="Add payment information">
        <form className="payment-modal-form" onSubmit={this.onConfirmPlan}>
          <div>Are you sure you want to change to the {Plans[confirmPlanId].name} plan? This change will take effect immediately.</div>
          <div className="plan-change-modal-buttons--container">
            <Button buttonType="subtle" onClick={cancelChange}>On second thought...</Button>
            <Button type="submit" disabled={savingPlanChange} loading={savingPlanChange}>Confirm</Button>
          </div>
          <div className={cx("payment-info-save-success-message", { hidden: !planChangeSaved })}>Plan changed successful!</div>
          <div className={cx("payment-info-save-failed-message", { hidden: !changePlanFailed })}>Plan change could not be saved. Please try again or contact support</div>
        </form>
      </Modal>
    );

  }

  renderPlans() {
    const {
      myPlanId,
    } = this.props;

    return (
      <div className="product-plan-cards--container">
        <div className={cx("product-plan-card--container", { selected: !myPlanId })} onClick={() => this.onChangePlan(null)}>
          <h3 className="product-plan-card--title">Free</h3>
          <div className="product-plan-card-price--container">
            <h2>$0</h2>
            <small>up to 10,000 events/mo</small>
          </div>
          <div className="product-plan-card-features--container">
            <div className="product-plan-card-feature">
              <span><FontAwesomeIcon icon={faCheck} size="xs" /> 30 day data retention</span>
            </div>
            <div className="product-plan-card-feature">
              <span><FontAwesomeIcon icon={faCheck} size="xs" /> Support via chat</span>
            </div>
            <div className="product-plan-card-bad-feature">
              <span><FontAwesomeIcon icon={faTimes} size="xs" /> No more than 10,000 events/mo</span>
            </div>
          </div>
        </div>

        <div className={cx("product-plan-card--container", { selected: PlanIdsToNames[myPlanId] === 'PREMIUM' })} onClick={() => this.onChangePlan('plan_GGOUZrL6sTHiXE')}>
          <h3 className="product-plan-card--title">Premium</h3>
          <div className="product-plan-card-price--container">
            <h2>$1</h2>
            <small>per 100,000 events/mo</small>
          </div>
          <div className="product-plan-card-features--container">
            <div className="product-plan-card-feature">
              <span><FontAwesomeIcon icon={faCheck} size="xs" /> Unlimited data retention</span>
            </div>
            <div className="product-plan-card-feature">
              <span><FontAwesomeIcon icon={faCheck} size="xs" /> On-call support</span>
            </div>
            <div className="product-plan-card-feature">
              <span><FontAwesomeIcon icon={faCheck} size="xs" /> No event limit</span>
            </div>
          </div>
        </div>
      </div>
    );
  }


  render() {
    const {
      anyUserHasPaymentInfo,
      myPlanId,
    } = this.props;

    return (
      <div className="account-settings-form-container">
        <h2>Billing</h2>
        <Button onClick={() => this.setState({ showPaymentModal: true })}>Update my payment info</Button>
        {this.renderPaymentModal()}
        {this.renderPlanChangeConfirmModal()}
        <p>You're currently on the <strong>{pathOr('Free', [myPlanId, 'name'], Plans)}</strong> plan.</p>
        {this.renderPlans()}
        {!anyUserHasPaymentInfo && 'bro you need some payment info here'}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  anyUserHasPaymentInfo: anyUserHasPaymentInfo(state),
  myPlanId: subscriptionPlanId(state),
})

const ConnectedBilling = connect(mapStateToProps)(injectStripe(PaymentSettings));

const StripeWrappedPaymentSettings = (props) => (
  <StripeProvider apiKey={STRIPE_PUBLIC_KEY}>
    <Elements>
      <ConnectedBilling {...props} />
    </Elements>
  </StripeProvider>
)

export default StripeWrappedPaymentSettings;
