import { useState, useEffect, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import regionList from "../data/region";
import "../styles/app.css";

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [regionSelected, setRegionSelected] = useState(regionList[0].name);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [checkboxError, setCheckboxError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const emailRef = useRef(true);
  const passwordRef = useRef(true);
  const password2Ref = useRef(true);

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current = false;
    } else {
      isEmail();
    }
  }, [email]);

  useEffect(() => {
    if (passwordRef.current) {
      passwordRef.current = false;
    } else {
      isPassword();
    }
  }, [password]);

  useEffect(() => {
    if (password2Ref.current) {
      password2Ref.current = false;
    } else {
      isMatch();
    }
  }, [password, password2]);

  const handleSubmit = (event) => {
    event.preventDefault();
    ischecked();
    simulation();
  };

  const ischecked = () => {
    if (checkbox) {
      setCheckbox(false);
    } else {
      setCheckbox(true);
    }
  };

  const isEmail = () => {
    if (!email) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const isMatch = () => {
    if (password !== password2) {
      setPasswordMatchError(true);
    } else {
      setPasswordMatchError(false);
    }
  };

  const isPassword = () => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!re.test(password)) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const simulateTimeout = async () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });
  };
  const simulation = () => {
    if (!checkbox) {
      setCheckboxError(true);
    } else if (
      !passwordError &&
      !passwordMatchError &&
      !emailError &&
      email &&
      password &&
      password2 &&
      checkbox
    ) {
      setLoading(true);
      simulateTimeout().then(() => {
        setLoading(false);
        setSuccess(true);
      });
    }
  };
  if (!success) {
    return (
      <div className='Login'>
        <Form onSubmit={handleSubmit} className='mt-5'>
          <span className='loginSpan'>Login</span>
          <Form.Group size='lg' controlId='email'>
            <Form.Label>Email*</Form.Label>
            <Form.Control
              autoFocus
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <span>Email cannot be empty</span>}
          </Form.Group>

          <Form.Group size='lg' controlId='password'>
            <Form.Label>Password*</Form.Label>
            <Form.Control
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && (
              <span>
                Password must contain at least 8 characters including at least 1
                letter, 1 number and 1 special character.
              </span>
            )}
          </Form.Group>

          <Form.Group size='lg' controlId='password2'>
            <Form.Label>Confirm Password*</Form.Label>
            <Form.Control
              type='password'
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
            {passwordMatchError && <span>The password is not match</span>}
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Region*</Form.Label>
            <Form.Select
              value={regionSelected}
              onChange={(e) => setRegionSelected(e.target.value)}
            >
              {regionList.map((region, idx) => {
                return (
                  <option key={idx} value={region.name}>
                    {region.name}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>

          <Form.Group className='my-3' controlId='formBasicCheckbox'>
            <Form.Check
              type='checkbox'
              onChange={(e) => setCheckbox(e.target.value)}
              label='I agree to the terms of use and privacy policy.'
            />
            {checkboxError && (
              <span>Please agree to the terms of use and privacy policy.*</span>
            )}
          </Form.Group>
          <Button
            className='mt-2 ms-3'
            size='md'
            type='submit'
            disabled={loading}
            onClick={() => {
              console.log(
                email,
                password,
                password2,
                regionSelected,
                checkbox,
                "Errors:",
                emailError,
                passwordError,
                passwordMatchError,
                checkboxError
              );
            }}
          >
            {loading ? "Loading..." : "Create Account"}
          </Button>
          <Button className='mt-2 ms-5' size='md'>
            Cancel
          </Button>
        </Form>
      </div>
    );
  } else {
    return (
      <div className='SuccessPage'>
        <h1>You successfully register an account.</h1>
      </div>
    );
  }
};

export default App;
