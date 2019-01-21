import React, { Component } from 'react';
import InputMask from 'react-input-mask';
import { Row, Col, Form, Icon, Button, Radio } from 'antd';
import ProfileIcon from '../../images/profileIcon.svg';
import moment from 'moment';

const FormItem = Form.Item;

class ProfileForm extends Component {
	
	dateBirthValidator = (rule, value, callback) => {
		let dateBirth = moment(value, 'DD/MM/YYYY', true).format();
		let today = moment(new Date()).format('MM/DD/YYYY');
		if(!moment(value, 'DD/MM/YYYY', true).isValid() || new Date(dateBirth) >= new Date(today)) {
			callback(this.props.t('profileForm.fieldDateBirthError'));
		}
	
		callback();
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
			wrapperCol: {
				sm: { span: 9, offset: 4 },
			},
			labelCol: {
				sm: { span: 9, offset: 4 },
			},
		};

		return (
			<Form onSubmit={(e) => this.props.saveFormData(e, this.props.form)}>
				<header>
					<img src={ProfileIcon} alt="icone perfil" />
					<h2>Perfil do usuário</h2>
				</header>
				<FormItem {...formItemLayout} className='form-input-mask'>
					{
						getFieldDecorator('birthday', {
							validateFirst: true,
							rules: [{
								validator: this.dateBirthValidator
							}]
						})(
							<div>
								<Icon type='calendar' style={{ color: 'rgba(0,0,0,.25)' }} />
								<InputMask mask='99/99/9999' maskChar={null} className='ant-input' placeholder={this.props.t('profileForm.fieldDateBirth')}/>
							</div>
						)
					}
				</FormItem>
				<FormItem label={this.props.t('profileForm.fieldGender')} {...formItemLayout}>
					{
						getFieldDecorator('gender', {
							initialValue: 1
						})(
							<Radio.Group>
								<Radio.Button value={1}>{this.props.t('profileForm.optionMan')}</Radio.Button>
								<Radio.Button value={2}>{this.props.t('profileForm.optionWoman')}</Radio.Button>
								<Radio.Button value={3}>{this.props.t('profileForm.optionOther')}</Radio.Button>
							</Radio.Group>
						)
					}
				</FormItem>
				<Row>
					<Col sm={{span: 9, offset: 4}}>
						<FormItem label={this.props.t('profileForm.fieldSmokes')}>
							{
								getFieldDecorator('isASmoker', {
									initialValue: true
								})(
									<Radio.Group>
										<Radio.Button value={true}>{this.props.t('profileForm.optionSmoker')}</Radio.Button>
										<Radio.Button value={false}>{this.props.t('profileForm.optionNSmoker')}</Radio.Button>
									</Radio.Group>
								)
							}
						</FormItem>
					</Col>
					<Col sm={9}>
						<FormItem label={this.props.t('profileForm.fieldPet')}>
							{
								getFieldDecorator('hasPet', {
									initialValue: true
								})(
									<Radio.Group>
										<Radio.Button value={true}>{this.props.t('profileForm.optionHave')}</Radio.Button>
										<Radio.Button value={false}>{this.props.t('profileForm.optionDHave')}</Radio.Button>
									</Radio.Group>
								)
							}
						</FormItem>
					</Col>
				</Row>
				<FormItem {...formItemLayout} className='button-list'>
					<Button onClick={this.props.skip}>{this.props.t('profileForm.buttonSkip')}</Button>
					<Button type='primary' htmlType='submit'>{this.props.t('profileForm.buttonContinue')}</Button>
				</FormItem>
			</Form>
		);
	}
}
const WrappedProfileForm = Form.create()(ProfileForm);

export default WrappedProfileForm;