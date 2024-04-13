import React from "react";
import "../spotify.css";

const buttonHoverText: { [key: string]: string } = {
  short_term: "Short term: Approximately last 4 weeks",
  medium_term: "Medium term: Approximately last 6 months",
  long_term: "Long term: Calculated from several years of data and including all new data as it becomes available",
};

interface TimeRangeRadioButtonsProps {
  time_ranges: string[];
  selectedTimeRange: string;
  onTimeRangeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function TimeRangeRadioButtons({
  time_ranges,
  selectedTimeRange,
  onTimeRangeChange,
}: TimeRangeRadioButtonsProps): JSX.Element {
  return (
    <div className="radio-button-section-container">
      {time_ranges.map((time_range, index) => (
        <div className="radio-button-container" key={index}>
          <input
            type="radio"
            value={time_range}
            checked={selectedTimeRange === time_range}
            onChange={onTimeRangeChange}
            className="radio-button"
            title={buttonHoverText[time_range]}
          />
        </div>
      ))}
    </div>
  );
}
