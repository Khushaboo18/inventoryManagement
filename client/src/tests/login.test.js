import React from 'react';
import { render , fireEvent, act } from '@testing-library/react';
import Login from '../components/login';

describe("Login component fields", () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        render(<Login />, div);
      });
  
    it("shows all required input fields with empty values", () => {
      const { getByTestId } = render(<Login />);
  
      expect(getByTestId("filter-input-email").value).toBe("");
      expect(getByTestId("filter-input-password").value).toBe("");
    });

    it("triggers event handler on input change of email and password", () => {
        const { getByTestId, rerender } = render( <Login /> );
    
        act(() => {
          fireEvent.change(getByTestId("filter-input-email"), {
            target: { value: "k@test.in" },
          });
        });

        act(() => {
            fireEvent.change(getByTestId("filter-input-password"), {
                target: { value: "1234567" },
            });
        });
    
        rerender(
          <Login/>
        );
    
        expect(getByTestId("filter-input-email").value).toBe("k@test.in");
        expect(getByTestId("filter-input-password").value).toBe("1234567");
    });
})