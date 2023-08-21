import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

const App = () => {
  const [passwords, setPasswords] = useState([]);
  const [range, setRange] = useState(8);
  const [type, setType] = useState({
    numbers: true,
    lowercase: true,
    uppercase: true,
    symbols: true,
  });

  const typeValues = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXTZ",
    lowercase: "abcdefghiklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "~!@#$%^&*()_+=-./<>?;:",
  };

  const generate = async () => {
    const filteredType = Object.keys(type)
      .filter((k) => {
        return type[k];
      })
      .sort(() => Math.random() - 0.5);

    let i = 0;
    let typeLen = filteredType.length;
    let pswd = [];

    while (i < range) {
      let c = 0;
      for (c = 0; c < typeLen && i < range; c++) {
        pswd.push(
          typeValues[filteredType[c]].charAt(
            Math.floor(Math.random() * typeValues[filteredType[c]].length)
          )
        );
        i++;
      }
    }

    const tmpPass = [...passwords];
    tmpPass.push(pswd.sort(() => Math.random() - 0.5).join(""));
    return setPasswords(tmpPass);
  };

  const handleChangeCheck = (e, t) => {
    const tmpType = { ...type };

    const len = Object.values(tmpType).filter((k) => {
      return k;
    }).length;

    if (len > 1) {
      tmpType[t] = e.target.checked;
      setType(tmpType);
    }

    if (len === 1 && e.target.checked) {
      tmpType[t] = e.target.checked;
      setType(tmpType);
    }
  };

  const handleChange = (e) => {
    const tmpPass = passwords;
    tmpPass.push(e.target.value);
    setPasswords(tmpPass);
  };

  const handleChangeRange = (e) => {
    if (e.target.value > 3) {
      setRange(e.target.value);
    }
  };

  useEffect(() => {
    let local_passwords = window.localStorage.getItem("passwords");
    if (local_passwords) {
      let passwords = local_passwords.split(",");
      let tmp = [...passwords];
      setPasswords(tmp);
    }
  }, []);

  useEffect(() => {
    if (passwords.length > 0) {
      let passwords_to_store = passwords.toString();
      window.localStorage.setItem("passwords", passwords_to_store);
    }
  }, [passwords]);

  return (
    <div className="bg-dark" style={{ "min-height": "100vh" }}>
      <div
        className="d-flex justify-content-center"
        style={{ "min-height": "100vh" }}
      >
        <div className="card text-center m-4 col-6">
          <h3 className="card-header">Password Generator</h3>

          <div className="card-body">
            <h5 className="card-title mt-2">Customize your password</h5>

            <p className="card-text ">
              <div className="input-group mt-5">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Password"
                  onChange={(e) => handleChange(e)}
                  value={passwords.slice(-1)}
                />
                <CopyToClipboard text={passwords[0]}>
                  <button className="btn btn-outline-primary" type="button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-clipboard"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                      <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                    </svg>
                  </button>
                </CopyToClipboard>
                <button
                  className="btn btn-outline-primary"
                  type="button"
                  onClick={() => {
                    generate();
                  }}
                >
                  Generate
                </button>
              </div>

              <label htmlFor="customRange1" className="form-label mt-5">
                Password Length : <b>{range}</b>
              </label>
              <input
                type="range"
                className="form-range"
                id="customRange1"
                value={range}
                onChange={(e) => {
                  handleChangeRange(e);
                }}
              />

              <div className="container d-flex  justify-content-between mt-5">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="uppercase"
                    onClick={(e) => {
                      handleChangeCheck(e, "uppercase");
                    }}
                    checked={type.uppercase}
                  />
                  <label className="form-check-label" for="uppercase">
                    Uppercase
                  </label>
                </div>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="lowercase"
                    onClick={(e) => {
                      handleChangeCheck(e, "lowercase");
                    }}
                    checked={type.lowercase}
                  />
                  <label className="form-check-label" for="lowercase">
                    Lowercase
                  </label>
                </div>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="numbers"
                    onClick={(e) => {
                      handleChangeCheck(e, "numbers");
                    }}
                    checked={type.numbers}
                  />
                  <label className="form-check-label" for="numbers">
                    Numbers
                  </label>
                </div>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="symbols"
                    onClick={(e) => {
                      handleChangeCheck(e, "symbols");
                    }}
                    checked={type.symbols}
                  />
                  <label className="form-check-label" for="symbols">
                    Symbols
                  </label>
                </div>
              </div>

              <ul class="list-group mt-5 mb-3">
                <li class="list-group-item list-group-item-secondary">
                  Last 5 Passwords
                </li>

                {passwords.length < 1 && (
                  <div class="mt-3">
                    <i>Such empty, Customize your password.</i>
                  </div>
                )}

                {passwords.slice(-5).map((el) => {
                  return (
                    <li class="list-group-item d-flex justify-content-between">
                      <span className="text-wrap" style={{ width: "95%" }}>
                        {el}
                      </span>{" "}
                      <CopyToClipboard text={passwords[0]} className="">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-clipboard border-primary"
                          viewBox="0 0 16 16"
                          type="button"
                        >
                          <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                          <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                        </svg>
                      </CopyToClipboard>
                    </li>
                  );
                })}
              </ul>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
