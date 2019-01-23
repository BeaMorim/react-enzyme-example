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
				<FormItem label='Você prefere morar apenas com' {...formItemLayout}>
					{
						getFieldDecorator('smokingPreferences', {
							initialValue: 1
						})(
							<Radio.Group>
								<Radio.Button value={1}>Fumantes</Radio.Button>
								<Radio.Button value={2}>Não fumantes</Radio.Button>
								<Radio.Button value={0}>Indiferente</Radio.Button>
							</Radio.Group>
						)
					}
				</FormItem>
				<FormItem label='Sobre animais domésticos, você prefere morar com pessoas que' {...formItemLayout}>
					{
						getFieldDecorator('petsPreferences', {
							initialValue: 1
						})(
							<Radio.Group>
								<Radio.Button value={1}>Possuam</Radio.Button>
								<Radio.Button value={2}>Não possuam</Radio.Button>
								<Radio.Button value={0}>Indiferente</Radio.Button>
							</Radio.Group>
						)
					}
				</FormItem>
				<FormItem label='Você prefere morar apenas com' {...formItemLayout}>
					{
						getFieldDecorator('genderPreferences', {
							initialValue: 1
						})(
							<Radio.Group>
								<Radio.Button value={1}>Homens</Radio.Button>
								<Radio.Button value={2}>Mulheres</Radio.Button>
								<Radio.Button value={3}>Outros</Radio.Button>
								<Radio.Button value={4}>Indiferente</Radio.Button>
							</Radio.Group>
						)
					}
				</FormItem>
				<FormItem label='Você prefere um lugar com quarto' {...formItemLayout}>
					{
						getFieldDecorator('bedroomPreferences', {
							initialValue: 1
						})(
							<Radio.Group>
								<Radio.Button value={1}>Individual</Radio.Button>
								<Radio.Button value={2}>Compartilhado</Radio.Button>
								<Radio.Button value={0}>Indiferente</Radio.Button>
							</Radio.Group>
						)
					}
				</FormItem>
				<Row>
					<Col sm={{span: 12, offset: 4}}>
						<FormItem label='Sobre vaga de garagem, você'>
							{
								getFieldDecorator('wantParkingSpaces', {
									initialValue: true
								})(
									<Radio.Group>
										<Radio.Button value={true}>Precisa</Radio.Button>
										<Radio.Button value={false}>Não precisa</Radio.Button>
									</Radio.Group>
								)							
							}
						</FormItem>
					</Col>
					<Col sm={6}>
						<FormItem label='Quantidade'>
							{
								getFieldDecorator('numberOfParkingSpaces', {
									rules: [{
										pattern: '^[1-9][0-9]*$',
										message: 'Informe uma quantidade válida!'
									}]
								})(
									<Input disabled={!this.getField('wantParkingSpaces')} type='number' placeholder='Quantidade' />
								)
							}
						</FormItem>
					</Col>
				</Row>
				<FormItem {...formItemLayout} className='button-list'>
					<Button type='primary' htmlType='submit' loading={this.props.loading}>Finalizar</Button>
				</FormItem>
			</Form>
		);
	}
}

const WrappedPreferencesForm = Form.create()(PreferencesForm);

export default WrappedPreferencesForm;