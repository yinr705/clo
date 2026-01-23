import React from 'react';
import styled from 'styled-components';

const SliderContainer = styled.div<{ disabled: boolean }>`
  padding: 20px;
  background: #000000;
  border-radius: 8px;
  margin-bottom: 20px;
  opacity: ${props => props.disabled ? 0.5 : 1};
  pointer-events: ${props => props.disabled ? 'none' : 'all'};
`;

const SliderLabels = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 14px;
  color: #f0f0f0;
`;

const SliderInput = styled.input`
  width: 100%;
  height: 5px;
  border-radius: 5px;
  background: #ddd;
  outline: none;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #00ff00;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #00ff00;
    cursor: pointer;
    border: none;
  }
`;

interface PriceSliderProps {
    min: number;
    max: number;
    values: [number, number];
    onChange: (values: [number, number]) => void;
    disabled?: boolean;
}

const PriceSlider: React.FC<PriceSliderProps> = ({
                                                     min,
                                                     max,
                                                     values,
                                                     onChange,
                                                     disabled = false
                                                 }) => {
    const [minValue, maxValue] = values;

    const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newMin = Math.min(Number(event.target.value), maxValue - 1);
        onChange([newMin, maxValue]);
    };

    const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newMax = Math.max(Number(event.target.value), minValue + 1);
        onChange([minValue, newMax]);
    };

    return (
        <SliderContainer disabled={disabled}>
            <SliderLabels>
                <span>${minValue}</span>
                <span>${maxValue}</span>
            </SliderLabels>
            <div style={{ position: 'relative' }}>
                <SliderInput
                    type="range"
                    min={min}
                    max={max}
                    value={minValue}
                    onChange={handleMinChange}
                    disabled={disabled}
                />
                <SliderInput
                    type="range"
                    min={min}
                    max={max}
                    value={maxValue}
                    onChange={handleMaxChange}
                    disabled={disabled}
                    style={{ position: 'absolute', top: 0 }}
                />
            </div>
        </SliderContainer>
    );
};

export default PriceSlider;