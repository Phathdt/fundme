import { useForm, Controller } from 'react-hook-form'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { ErrorMessage } from '@hookform/error-message'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { toast } from 'react-toastify'

const schema = yup
  .object({
    amount: yup.number().positive().integer().required(),
  })
  .required()

export default function FundMe() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data) => {
    console.log(data)
    toast.success('Wow so easy!')
  }

  return (
    <div className="container">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for="amount">Amount</Label>

          <Controller
            name="amount"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Input {...field} />}
          />
          <ErrorMessage
            errors={errors}
            name="amount"
            render={({ message }) => <p className="text-danger">{message}</p>}
          />
        </FormGroup>

        <Button type="submit">Submit</Button>
      </Form>
    </div>
  )
}
