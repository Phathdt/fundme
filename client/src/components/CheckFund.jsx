import { useForm, Controller } from 'react-hook-form'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { ErrorMessage } from '@hookform/error-message'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup
  .object({
    address: yup.string().length(42).required(),
  })
  .required()

export default function CheckFund({ check, valueDonate }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data) => {
    check(data.address)
  }

  return (
    <div className="container">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for="address">Check address</Label>

          <Controller
            name="address"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Input {...field} />}
          />
          <ErrorMessage
            errors={errors}
            name="address"
            render={({ message }) => <p className="text-danger">{message}</p>}
          />
        </FormGroup>

        <Button type="submit">Submit</Button>
      </Form>
    </div>
  )
}
