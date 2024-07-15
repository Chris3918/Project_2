import React, { useState } from "react";
import "@/app/spotify/components/spotify.css";

const buttonHoverText: { [key: string]: string } = {
  short_term: "Short term: Approximately last 4 weeks",
  medium_term: "Medium term: Approximately last 6 months",
  long_term: "Long term: Calculated from several years of data and including all new data as it becomes available",
};

/**Presentation
 * Renders a component that displays a set of radio buttons for selecting time ranges.
 *
 * @param {Object} props - The component props.
 * @param {string[]} props.time_ranges - An array of time ranges to display as radio buttons.
 * @param {string} props.selectedTimeRange - The currently selected time range.
 * @param {function} props.onTimeRangeChange - A callback function to handle time range selection changes.
 * @returns {JSX.Element} The rendered component.
 */
interface TopArtistTimeRangeButtonsProps {
  time_ranges: string[];
  selectedTimeRange: string;
  onTimeRangeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function TopArtistTimeRangeButtons({
  time_ranges,
  selectedTimeRange,
  onTimeRangeChange,
}: TopArtistTimeRangeButtonsProps) {
  return (
    <div className="user-top-artist-card__radio-section">
      {time_ranges.map((time_range, index) => (
        <div className="user-top-artist-card__radio-container" key={index}>
          <input
            type="radio"
            value={time_range}
            checked={selectedTimeRange === time_range}
            onChange={onTimeRangeChange}
            className="user-top-artist-card__radio-button"
            title={buttonHoverText[time_range]}
          />
        </div>
      ))}
    </div>
  );
}

/**Container
 * Handles the change event of the TopArtistTimeRangeButtons component.
 * @param {Object} props - The component props.
 * @param {string} props.defaultTimeRange - The default time range.
 * @param {string[]} props.time_ranges - The available time ranges.
 * @returns {Object} - An object containing the timeRangeRadioButtonsComponent and selectedTimeRangeButton.
 */
interface TopArtistTimeRangeButtonsOnChangeProps {
  defaultTimeRange: string;
  time_ranges: string[];
}

export function TopArtistTimeRangeButtonsOnChange({
  defaultTimeRange,
  time_ranges,
}: TopArtistTimeRangeButtonsOnChangeProps) {
  const [selectedTimeRangeButton, setSelectedTimeRangeButton] = useState(defaultTimeRange);

  /**
   * Handles the change event of the radio buttons.
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event.
   */
  const handleTimeRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTimeRangeButton(event.target.value);
  };

  // The visual component with the radio buttons
  const timeRangeRadioButtonsComponent = (
    <TopArtistTimeRangeButtons
      time_ranges={time_ranges}
      selectedTimeRange={selectedTimeRangeButton}
      onTimeRangeChange={handleTimeRangeChange} // Pass the handleTimeRangeChange function as the onChange prop
    />
  );

  // Return both the visual component and the selected time range state
  return {
    timeRangeRadioButtonsComponent,
    selectedTimeRangeButton,
  };
}
