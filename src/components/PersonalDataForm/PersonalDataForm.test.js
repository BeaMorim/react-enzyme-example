import React from 'react';
import ReactDOM from 'react-dom';
import PersonalDataForm from './index';
import { Button } from 'antd';
import { shallow, mount, render } from 'enzyme';

describe('unit tests', () => {

    it('find elements by class', () => {
        const wrapper = mount(<div><span className="some-class" /></div>);
        expect(wrapper.exists('.some-class')).toEqual(true);
        expect(wrapper.find('.other-class').exists()).toEqual(false);
    })

    it('show shallow rendering', () => {
        const wrapper = shallow(<PersonalDataForm user={{}} />);
        // console.log(wrapper.debug());   
    })

    it('show mount', () => {
        const wrapper = mount(<PersonalDataForm user={{}} />);
        // console.log(wrapper.debug());
    })

    it('change step on button click', () => {

        const wrapper = mount(<PersonalDataForm user={{}} />);
        const form = wrapper.find('PersonalDataForm').getElement().props.form;

        form.setFieldsValue({ userName: "Beatriz" });
        form.setFieldsValue({ cpf: "123.456.789-09" });
        form.setFieldsValue({ email: "teste@gmail.com" });
        form.setFieldsValue({ password: "12345678" });
        form.setFieldsValue({ confirmPassword: "123456789" });

        var result;
        form.validateFields((err, values) => { result = err; });
        expect(Boolean(result.confirmPassword)).toBe(true);
    })

    it('', () => {
        // console.log(wrapper.debug());
        // console.log(wrapper.find('PersonalDataForm').getElement().props.form);

        // const wrapper = mount( <PersonalDataForm user={{}} /> );
        // expect(wrapper.find('[layout="vertical"]').exists()).toEqual(true);

        // wrapper.find('button').simulate('click');
        // wrapper.find('[type=false]');

        // wrapper.findWhere(n => n.type() !== 'string');


        // wrapper.props().form.setFieldsValue({ password: "12345678" });
        // wrapper.props().form.setFieldsValue({ confirmPassword: "123456789" });

        // expect(wrapper.find('#pass').exists()).toEqual(true);
        // expect(wrapper.find('#pass').find('Input').length).toBe(1);
        // wrapper.find('#pass').find('Input').simulate('change', { target: { value: 'Hello' } })
        // wrapper.update();
        // expect(wrapper.props()).toBe({batata: ''})

        // const wrapper2 = render(<PersonalDataForm user={{}} />);
        // expect(wrapper2.props).toBe({batata: ''})
        // let teste;
        // wrapper2.props().form.setFieldsValue({ password: "12345678" });
        // teste = wrapper2.props().form.getFieldsValue(['password']);
        // expect(teste).toBe({batata: ''})


        // const w = render(<PersonalDataForm user={{}} />);
        // expect(w.getElement()).toBe(1)        

        // expect(wrapper.find('Input').length).toBe(1);
    })
})