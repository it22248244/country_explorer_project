import { render, screen, fireEvent } from '@testing-library/react';
import RegionFilter from '../../components/RegionFilter';

describe('RegionFilter Component', () => {
  test('selecting a region calls onFilter with the correct value', () => {
    // Create a mock function for the onFilter prop
    const mockOnFilter = jest.fn();
    
    // Render the RegionFilter component with the mock function
    render(<RegionFilter onFilter={mockOnFilter} />);
    
    // Find and click the dropdown button to open it
    const dropdownButton = screen.getByText('Filter by Region');
    fireEvent.click(dropdownButton);
    
    // Find and click on a specific region option
    const asiaOption = screen.getByText('Asia');
    fireEvent.click(asiaOption);
    
    // Verify that onFilter was called with the correct region
    expect(mockOnFilter).toHaveBeenCalledWith('Asia');
    
    // Check that the dropdown now shows the selected region
    expect(screen.getByText('Asia')).toBeInTheDocument();
  });
});
