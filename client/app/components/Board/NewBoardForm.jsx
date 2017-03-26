import React from 'react';
import {
  Form,
  Icon,
  Input,
  Button,
  Checkbox,
  Alert
} from 'antd';

const FormItem = Form.Item;

class NewBoardForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { form, onFormSubmit, hideBoardModal } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        onFormSubmit(values, hideBoardModal);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const labelStyle = {
      fontSize: "15px",
      fontWeight: 500,
      marginBottom: "10px",
      display: "inline-block",
    };
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <label style={labelStyle}>Title: </label>
        <FormItem>
          {getFieldDecorator('title', {
            rules: [{ required: true, message: 'Please input title for the new Board!' }],
          })(
            <Input placeholder='Like "New Book"' />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Create
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedNewBoardForm = Form.create()(NewBoardForm);

export default WrappedNewBoardForm;
