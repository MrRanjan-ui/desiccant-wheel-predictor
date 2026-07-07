import { useForm } from 'react-hook-form';
import type { PredictionInputs } from '../types';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface InputFormProps {
  onSubmit: (data: PredictionInputs) => void;
  onReset: () => void;
  defaultValues: PredictionInputs;
}

export function InputForm({ onSubmit, onReset, defaultValues }: InputFormProps) {
  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors }
  } = useForm<PredictionInputs>({
    defaultValues
  });

  const handleFormReset = () => {
    resetForm(defaultValues);
    onReset();
  };

  return (
    <Card
      title="Input Operational Parameters"
      subtitle="Configure process, regeneration, and wheel matrix parameters"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        
        {/* Group 1: Process Air Stream */}
        <div className="space-y-3">
          <div className="border-b border-[#D6D9DE] pb-1">
            <h4 className="text-[13px] font-bold text-[#1E4E79] tracking-wider uppercase">
              1. Process Air Stream
            </h4>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Inlet Temp (15–45)"
              unit="°C"
              type="number"
              step="0.1"
              placeholder="30.0"
              error={errors.inletTemp?.message}
              {...register('inletTemp', {
                required: 'Required',
                valueAsNumber: true,
                min: { value: 15, message: 'Min 15°C' },
                max: { value: 45, message: 'Max 45°C' }
              })}
            />
            <Input
              label="Relative Humidity (10–95)"
              unit="%"
              type="number"
              step="0.1"
              placeholder="60.0"
              error={errors.relativeHumidity?.message}
              {...register('relativeHumidity', {
                required: 'Required',
                valueAsNumber: true,
                min: { value: 10, message: 'Min 10%' },
                max: { value: 95, message: 'Max 95%' }
              })}
            />
            <Input
              label="Air Velocity (0.5–5.0)"
              unit="m/s"
              type="number"
              step="0.1"
              placeholder="2.0"
              error={errors.airVelocity?.message}
              {...register('airVelocity', {
                required: 'Required',
                valueAsNumber: true,
                min: { value: 0.5, message: 'Min 0.5 m/s' },
                max: { value: 5.0, message: 'Max 5.0 m/s' }
              })}
            />
            <Input
              label="Flow Rate (100–2000)"
              unit="m³/h"
              type="number"
              step="1"
              placeholder="500"
              error={errors.processFlowRate?.message}
              {...register('processFlowRate', {
                required: 'Required',
                valueAsNumber: true,
                min: { value: 100, message: 'Min 100 m³/h' },
                max: { value: 2000, message: 'Max 2000 m³/h' }
              })}
            />
          </div>
        </div>

        {/* Group 2: Regeneration Stream */}
        <div className="space-y-3">
          <div className="border-b border-[#D6D9DE] pb-1">
            <h4 className="text-[13px] font-bold text-[#1E4E79] tracking-wider uppercase">
              2. Regeneration Heater Stream
            </h4>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Regen Temp (50–160)"
              unit="°C"
              type="number"
              step="0.1"
              placeholder="120.0"
              error={errors.regTemp?.message}
              {...register('regTemp', {
                required: 'Required',
                valueAsNumber: true,
                min: { value: 50, message: 'Min 50°C' },
                max: { value: 160, message: 'Max 160°C' }
              })}
            />
            <Input
              label="Regen Flow (50–1000)"
              unit="m³/h"
              type="number"
              step="1"
              placeholder="250"
              error={errors.regFlowRate?.message}
              {...register('regFlowRate', {
                required: 'Required',
                valueAsNumber: true,
                min: { value: 50, message: 'Min 50 m³/h' },
                max: { value: 1000, message: 'Max 1000 m³/h' }
              })}
            />
          </div>
        </div>

        {/* Group 3: Wheel Matrix Geometry */}
        <div className="space-y-3">
          <div className="border-b border-[#D6D9DE] pb-1">
            <h4 className="text-[13px] font-bold text-[#1E4E79] tracking-wider uppercase">
              3. Desiccant Wheel Geometry
            </h4>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-1">
              <Input
                label="Speed (1–30)"
                unit="RPM"
                type="number"
                step="0.1"
                placeholder="12.0"
                error={errors.wheelSpeed?.message}
                {...register('wheelSpeed', {
                  required: 'Required',
                  valueAsNumber: true,
                  min: { value: 1, message: 'Min 1' },
                  max: { value: 30, message: 'Max 30' }
                })}
              />
            </div>
            <div className="col-span-1">
              <Input
                label="Thick (50–400)"
                unit="mm"
                type="number"
                step="1"
                placeholder="200"
                error={errors.wheelThickness?.message}
                {...register('wheelThickness', {
                  required: 'Required',
                  valueAsNumber: true,
                  min: { value: 50, message: 'Min 50' },
                  max: { value: 400, message: 'Max 400' }
                })}
              />
            </div>
            <div className="col-span-1">
              <Input
                label="Ch Height (1–4)"
                unit="mm"
                type="number"
                step="0.1"
                placeholder="2.0"
                error={errors.channelHeight?.message}
                {...register('channelHeight', {
                  required: 'Required',
                  valueAsNumber: true,
                  min: { value: 1.0, message: 'Min 1.0' },
                  max: { value: 4.0, message: 'Max 4.0' }
                })}
              />
            </div>
          </div>
        </div>

        {/* Form Action Buttons */}
        <div className="flex gap-3 pt-3 border-t border-[#D6D9DE] justify-end">
          <Button variant="secondary" onClick={handleFormReset}>
            Reset
          </Button>
          <Button variant="primary" type="submit">
            Predict Performance
          </Button>
        </div>
      </form>
    </Card>
  );
}
export default InputForm;
