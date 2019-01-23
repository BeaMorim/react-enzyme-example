import React, { Component } from 'react';
import PersonalDataForm from '../../components/PersonalDataForm/index';
import PreferencesForm from '../../components/PreferencesForm/index';
import ProfileForm from '../../components/ProfileForm/index';
import { Row, Col, Steps } from 'antd';
import moment from 'moment';
import './style.less';

const { Step } = Steps;

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            current: 0,
            loading: false,
        };
    }

    formatData = (values) => {
        if(values.cpf) {
            let userCpf = values.cpf;
            let formatCpf = userCpf.replace(/[^\d]+/g,'');
            values.cpf = formatCpf;
        }
        if(values.birthday) {
            let userBirthday = values.birthday;
            let formatBirthday = moment(userBirthday, 'DD/MM/YYYY').format();
            values.birthday = formatBirthday;
        }

        return values;
    };

    saveFormData = (event, form) => {
		event.preventDefault();

		let dataForm = {};
		let currentStep = this.state.current;

		form.validateFields((err, values) => { 
			if(!err) {
				dataForm = this.formatData(values);
				currentStep = this.state.current + 1;
			}
        });
        
		this.setState({
			current: currentStep,
			user: {
				...this.state.user,
				...dataForm,
			}
        });
	};

    skip = (event) => {
        event.preventDefault();

        let currentStep = this.state.current + 1;
        this.setState({ current: currentStep });
    };

    registerUser = (event) => {
        this.setState({ loading: true });

        // registerUser(this.state.user)
    };


    render() {
        const { current } = this.state;

        return (  
            <div className='register'>
                <Row>
                    <Col sm={10} xs={0}>
                        <h1>HOMESHARE</h1>
                    </Col>  
                    <Col sm={14} xs={24} className='register-content'>
                        <Row>
                            <Col md={{ span: 14, offset: 5 }}>
                                <Steps progressDot size='small' current={this.state.current}>
                                    <Step />
                                    <Step />
                                    <Step />
                                </Steps>
                            </Col>
                        </Row>
                        <div>
                            {
                                current < 1 && 
                                <PersonalDataForm 
                                    saveFormData={this.saveFormData}
                                    user={this.state.user} /> 
                            }
                            {
                                current === 1 &&
                                <ProfileForm 
                                    saveFormData={this.saveFormData}
                                    return={this.return}
                                    skip={this.skip} /> 
                            }
                            {
                                current === 2 && 
                                <PreferencesForm 
                                    submit={this.registerUser}
                                    skip={this.skipLast}
                                    loading={this.state.loading} /> 
                            }  
                        </div>
                    </Col>    
                </Row>
            </div>
        );
    }

}

export default Register;