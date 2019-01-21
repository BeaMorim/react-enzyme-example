import React, { Component } from 'react';
import { Row, Col, Radio, Form, Input, Select, Spin, Button } from 'antd';
import PreferencesIcon from '../../images/preferencesIcon.svg';

const FormItem = Form.Item;
const Option = Select.Option;

class PreferencesForm extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	getField = (field) => {
		return this.props.form.getFieldsValue([field])[field];
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
			wrapperCol: {
				sm: { span: 18, offset: 4 },
			},
			labelCol: {
				sm: { span: 18, offset: 4 },
			},
		};

		return (
			<Form onSubmit={(e) => this.props.submit(e, this.props.form)}>
				<header>
					<img src={PreferencesIcon} alt="icone preferencias" />
					<h2>Preferências</h2>
				</header>
				<FormItem label={this.props.t('preferencesForm.fieldPreferToLive')} {...formItemLayout}>
					{
						getFieldDecorator('smokingPreferences', {
							initialValue: 1
						})(
							<Radio.Group>
								<Radio.Button value={1}>{this.props.t('preferencesForm.optionSmokers')}</Radio.Button>
								<Radio.Button value={2}>{this.props.t('preferencesForm.optionNSmokers')}</Radio.Button>
								<Radio.Button value={0}>{this.props.t('preferencesForm.optionIndifferent')}</Radio.Button>
							</Radio.Group>
						)
					}
				</FormItem>
				<FormItem label={this.props.t('preferencesForm.fieldPreferToLiveWPeopleWho')} {...formItemLayout}>
					{
						getFieldDecorator('petsPreferences', {
							initialValue: 1
						})(
							<Radio.Group>
								<Radio.Button value={1}>{this.props.t('preferencesForm.optionHasPet')}</Radio.Button>
								<Radio.Button value={2}>{this.props.t('preferencesForm.optionDHavePet')}</Radio.Button>
								<Radio.Button value={0}>{this.props.t('preferencesForm.optionIndifferent')}</Radio.Button>
							</Radio.Group>
						)
					}
				</FormItem>
				<FormItem label={this.props.t('preferencesForm.fieldPreferToLive')} {...formItemLayout}>
					{
						getFieldDecorator('genderPreferences', {
							initialValue: 1
						})(
							<Radio.Group>
								<Radio.Button value={1}>{this.props.t('preferencesForm.optionMen')}</Radio.Button>
								<Radio.Button value={2}>{this.props.t('preferencesForm.optionWomen')}</Radio.Button>
								<Radio.Button value={3}>{this.props.t('preferencesForm.optionOther')}</Radio.Button>
								<Radio.Button value={4}>{this.props.t('preferencesForm.optionIndifferent')}</Radio.Button>
							</Radio.Group>
						)
					}
				</FormItem>
				<FormItem label={this.props.t('preferencesForm.fieldPreferToHave')} {...formItemLayout}>
					{
						getFieldDecorator('bedroomPreferences', {
							initialValue: 1
						})(
							<Radio.Group>
								<Radio.Button value={1}>{this.props.t('preferencesForm.optionIndividual')}</Radio.Button>
								<Radio.Button value={2}>{this.props.t('preferencesForm.optionShared')}</Radio.Button>
								<Radio.Button value={0}>{this.props.t('preferencesForm.optionIndifferent')}</Radio.Button>
							</Radio.Group>
						)
					}
				</FormItem>
				<Row>
					<Col sm={{span: 12, offset: 4}}>
						<FormItem label={this.props.t('preferencesForm.fieldParkingSpace')}>
							{
								getFieldDecorator('wantParkingSpaces', {
									initialValue: true
								})(
									<Radio.Group>
										<Radio.Button value={true}>{this.props.t('preferencesForm.optionNeed')}</Radio.Button>
										<Radio.Button value={false}>{this.props.t('preferencesForm.optionDNeed')}</Radio.Button>
									</Radio.Group>
								)							
							}
						</FormItem>
					</Col>
					<Col sm={6}>
						<FormItem label={this.props.t('preferencesForm.fieldAmount')}>
							{
								getFieldDecorator('numberOfParkingSpaces', {
									rules: [{
										pattern: '^[1-9][0-9]*$',
										message: this.props.t('preferencesForm.fieldAmountValidation')
									}]
								})(
									<Input disabled={!this.getField('wantParkingSpaces')} type='number' placeholder={this.props.t('preferencesForm.fieldAmount')} />
								)
							}
						</FormItem>
					</Col>
				</Row>
				<FormItem {...formItemLayout} className='button-list'>
					<Button type='primary' htmlType='submit'> Finalizar </Button>
				</FormItem>
			</Form>
		);
	}
}

const WrappedPreferencesForm = Form.create()(PreferencesForm);

export default WrappedPreferencesForm;