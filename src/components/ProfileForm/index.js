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
			callback('Informe uma data de nascimento válida!');
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
								<InputMask mask='99/99/9999' maskChar={null} className='ant-input' placeholder='Data de nascimento'/>
							</div>
						)
					}
				</FormItem>
				<FormItem label='Gênero' {...formItemLayout}>
					{
						getFieldDecorator('gender', {
							initialValue: 1
						})(
							<Radio.Group>
								<Radio.Button value={1}>Masculino</Radio.Button>
								<Radio.Button value={2}>Feminino</Radio.Button>
								<Radio.Button value={3}>Outro</Radio.Button>
							</Radio.Group>
						)
					}
				</FormItem>
				<Row>
					<Col sm={{span: 9, offset: 4}}>
						<FormItem label='Você é:'>
							{
								getFieldDecorator('isASmoker', {
									initialValue: true
								})(
									<Radio.Group>
										<Radio.Button value={true}>Fumante</Radio.Button>
										<Radio.Button value={false}>Não fumante</Radio.Button>
									</Radio.Group>
								)
							}
						</FormItem>
					</Col>
					<Col sm={9}>
						<FormItem label='Animal de estimação'>
							{
								getFieldDecorator('hasPet', {
									initialValue: true
								})(
									<Radio.Group>
										<Radio.Button value={true}>Possui</Radio.Button>
										<Radio.Button value={false}>Não possui</Radio.Button>
									</Radio.Group>
								)
							}
						</FormItem>
					</Col>
				</Row>
				<FormItem {...formItemLayout} className='button-list'>
					<Button onClick={this.props.skip}>Pular</Button>
					<Button type='primary' htmlType='submit'>Continuar</Button>
				</FormItem>
			</Form>
		);
	}
}
const WrappedProfileForm = Form.create()(ProfileForm);

export default WrappedProfileForm;