import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Register from '../components/register';

describe("Login component form fields", () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        render(<Register />, div);
      });
  
    it("shows all required input fields with empty values", () => {
      const { getByTestId } = render(<Register />);
  
      expect(getByTestId("filter-input-name").value).toBe("");
      expect(getByTestId("filter-input-password").value).toBe("");
      expect(getByTestId("filter-input-email").value).toBe("");
      expect(getByTestId("filter-input-cpassword").value).toBe("");
    });

    it("triggers event handler on input change of email and password", () => {
        const { getByTestId, rerender } = render( <Register /> );
    
        act(() => {
          fireEvent.change(getByTestId("filter-input-name"), {
            target: { value: "ABC" },
          });
        });

        act(() => {
            fireEvent.change(getByTestId("filter-input-password"), {
                target: { value: "1234567" },
            });
        });
        act(() => {
            fireEvent.change(getByTestId("filter-input-email"), {
                target: { value: "k@test.in" },
            });
        });

        act(() => {
            fireEvent.change(getByTestId("filter-input-cpassword"), {
                target: { value: "1234567" },
            });
        });
    
        rerender(
          <Register/>
        );
    
        expect(getByTestId("filter-input-name").value).toBe("ABC");
        expect(getByTestId("filter-input-password").value).toBe("1234567");
        expect(getByTestId("filter-input-email").value).toBe("k@test.in");
        expect(getByTestId("filter-input-cpassword").value).toBe("1234567");
    });
  })