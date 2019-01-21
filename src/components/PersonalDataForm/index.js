import React, { Component } from 'react';
import { Row, Form, Icon, Input, Button, Modal, Checkbox } from 'antd';
import { cpfValidator } from '../../utils/functions';
import InputMask from 'react-input-mask';
import PersonalDataIcon from '../../images/personalDataIcon.svg';

const FormItem = Form.Item;

class PersonalDataForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userPhoto: '',
			previewPhoto: '',
			previewVisible: false,
			contactsCounter: 1,
			contactTypes: [],
			loadingContacts: false
		};
	}

	getField = (field) => {
		return this.props.form.getFieldsValue([field])[field];
	}

	confirmPasswordValidator = (rule, value, callback) => {
		if (value && value !== this.getField('password')) {
			callback("As senhas não coicidem!");
		}

		callback();
	}

	cpfValidator = (rule, value, callback) => {
		if(!cpfValidator(value)) {
			callback("Por favor informe um CPF válido!");
		}

		callback();
	}

	savePersonalData = (event) => {
		this.props.saveFormData(this.props.form);
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
			wrapperCol: {
				md: { span: 17, offset: 4 },
			},
		};

		return (
			<Form onSubmit={(e) => this.props.saveFormData(e, this.props.form, this.state.userPhoto)} layout='vertical'>
				<header>
					<img src={PersonalDataIcon} alt='Dados Pessoais' />
					<h2>Dados pessoais</h2>
				</header>
				<FormItem {...formItemLayout}>
					{
						getFieldDecorator('userName', {
							rules: [{ 
								required: true, 
								message: "Por favor informe seu nome!",
								initialValue: this.props.user.userName
							}],
						})(
							<Input prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Nome"/>
						)
					}
				</FormItem>
				<FormItem {...formItemLayout}>
					{
						getFieldDecorator('email', {
							rules: [{ 
								required: true, 
								message: "Por favor, informe o e-mail!",
							}],
							validateFirst: true
						})(
							<Input prefix={<Icon type='mail' style={{ color: 'rgba(0,0,0,.25)' }} />} type='email' placeholder="E-mail" />
						)
					}
				</FormItem>
				<FormItem className='form-input-mask' {...formItemLayout}>
					{
						getFieldDecorator('cpf', {
							rules: [{ 
								required: true,
								validator: this.cpfValidator
							}],
							validateFirst: true
						})(
							<div>
								<Icon type='idcard' style={{ color: 'rgba(0,0,0,.25)' }} />
								<InputMask mask='999.999.999-99' maskChar={null} className='ant-input' placeholder="CPF"/>
							</div>
						)
					}
				</FormItem>
				<FormItem {...formItemLayout}>
					{
						getFieldDecorator('password', {
							rules: [{ 
								required: true,
								message: "Por favor informe uma senha válida (mínimo de 8 caracteres)!",
								min: 8
							}],
						})(
							<Input prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder="Senha"/>
						)
					}
				</FormItem>
				<FormItem {...formItemLayout}>
					{
						getFieldDecorator('confirmPassword', {
							rules: [{ 
								required: true,
								validator: this.confirmPasswordValidator 
							}],
						})(
							<Input prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder="Confirmação de senha" />
						)
					}
				</FormItem>
				<Row className='checkbox-list'>
					<FormItem {...formItemLayout}>
						{
							getFieldDecorator('isProfileAnnounced', {
								valuePropName: 'checked',
								initialValue: false
							})(
								<Checkbox>Anunciar perfil</Checkbox>
							)
						}
					</FormItem>
					<FormItem {...formItemLayout}>
						{
							getFieldDecorator('wantEmail', {
								valuePropName: 'checked',
								initialValue: false
							})(
								<Checkbox>Receber mensagens de atualizações no e-mail</Checkbox>
							)
						}
					</FormItem>
				</Row>
				<FormItem {...formItemLayout}>
					<Button type='primary' htmlType='submit'>Continuar</Button>
				</FormItem>
			</Form>
		);
	}
}

const WrappedPersonalDataForm = Form.create()(PersonalDataForm);

export default WrappedPersonalDataForm;