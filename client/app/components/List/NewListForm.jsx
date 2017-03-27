import React from 'react';
import {
  Form,
  Icon,
  Input,
  Button,
  Checkbox,
  Alert,
} from 'antd';

const FormItem = Form.Item;

class NewListForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { form, onFormSubmit, boardId, hideDropdown } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        onFormSubmit(values, boardId, hideDropdown);
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
      <Form onSubmit={this.handleSubmit} className="new-list-form">
        <label style={labelStyle}>List Title: </label>
        <FormItem>
          {getFieldDecorator('title', {
            rules: [{ required: true, message: 'Please input title for the new List!' }],
          })(
            <Input placeholder='Like "New Book"' />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="new-list-form-button">
            Create
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedNewListForm = Form.create()(NewListForm);

export default WrappedNewListForm;
