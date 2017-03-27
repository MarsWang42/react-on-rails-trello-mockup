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

class NewTaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { form, onFormSubmit, listId, boardId, hideDropdown } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        onFormSubmit(values, listId, boardId, hideDropdown);
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
      <Form onSubmit={this.handleSubmit} className="new-task-form">
        <label style={labelStyle}>Task Title: </label>
        <FormItem>
          {getFieldDecorator('title', {
            rules: [{ required: true, message: 'Please input title for the new Task!' }],
          })(
            <Input autoFocus placeholder='Like "write the syllabus"' />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="new-task-form-button">
            Create
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedNewTaskForm = Form.create()(NewTaskForm);

export default WrappedNewTaskForm;
