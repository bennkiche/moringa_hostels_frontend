import React from 'react';

const Footer = () => {
  return (
    <footer
      style={{
        width: '100vw',
        background: 'linear-gradient(to right, #00093c, #2d0b00)',
        padding: ' 20px', 
        color: '#fff',
        fontSize: '14px', 
        lineHeight: '1.6',
        position: 'relative',
        marginTop: '25px', 
        height: 'auto',
        left:'0',
      }}
    >
      <div
        className="row"
        style={{
          width: '100%', 
          maxWidth:'1200px',
          margin: 'auto',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          gap:'20px'
        }}
      >
        <div
          className="col"
          style={{
            padding: '10px',
            flexBasis:'22%',
            minWidth:'250px'
          }}
        >
          <img
            src="https://pbs.twimg.com/profile_images/1489569110040141826/ZzZgytR8_400x400.png"
            className="logo"
            alt="Moringa School logo"
            style={{
              width: '150px',
              height: '150px',
              marginBottom: '10px',
            }}
          />
          <p>
            We are committed to making our website accessible to all users. Please contact us if you encounter any issues.
          </p>
        </div>

        <div
          className="col"
          style={{
            padding: '10px',
            flexBasis: '22%',
            minWidth: '250px'
          }}
        >
          <h3
            style={{
              textAlign:'centre',
              marginBottom: '10px',
            }}
          >
            Moringa School
            <div
              className="underline"
              style={{
                width: '50%',
                height: '3px',
                background: '#767676',
                borderRadius: '3px',
                position: 'relative',
                top:'5px',
                margin:'0 auto'
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: '0',
                  left: '0px',
                  width: '12px',
                  height: '100%',
                  background: '#fff',
                  borderRadius: '3px',
                  animation: 'moving 2s linear infinite',
                }}
              ></span>
            </div>
          </h3>
          <p>Ngong Lane Plaza</p>
          <p>Ngong Road, Nairobi</p>
          <p>P.O Box 28860 - 00100, Nairobi</p>
           admissions@moringaschool.com
          <p className="contact-number">+254711082146</p>
          <p
            className="email-id"
            style={{
              width: 'fit-content',
              borderBottom: '1px solid #ccc',
              margin: '10px 0',
            }}
          > 
          </p>
        </div>

        <div
          className="col"
          style={{
            padding: '10px',
            flexBasis: '22%',
          }}
        >
          <h3
            style={{
              marginBottom: '20px',
              position:'relative',
            }}
          >
            Links
            <div
              className="underline"
              style={{
                width: '30%',
                height: '3px',
                background: '#767676',
                borderRadius: '3px',
                position: 'relative',
                top:'5px',
                margin:'0 auto'
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: '0',
                  left: '0px',
                  width: '5px',
                  height: '100%',
                  background: '#fff',
                  borderRadius: '3px',
                  animation: 'moving 2s linear infinite',
                }}
              ></span>
            </div>
          </h3>
          <ul
            style={{
              listStyle: 'none',
              padding: '0',
              margin: '0',
            }}
          >
            <li>
              <a href="#" style={{ textDecoration: 'none', color: '#fff' }}>
                Home
              </a>
            </li>
            <li>
              <a href="#" style={{ textDecoration: 'none', color: '#fff' }}>
                About Us
              </a>
            </li>
            <li>
              <a href="#" style={{ textDecoration: 'none', color: '#fff' }}>
                Accommodations
              </a>
            </li>
            <li>
              <a href="#" style={{ textDecoration: 'none', color: '#fff' }}>
                Contacts
              </a>
            </li>
          </ul>
          <style>
  {`
    @keyframes moving {
      0% {
        left: 0;
      }
      50% {
        left: 95%;
      }
      100% {
        left: 0;
      }
    }
  `}
</style>
        </div>

        <div
          className="col"
          style={{
            padding: '10px',
            flexBasis: '22%',
          }}
        >
          <h3
            style={{
              width: 'fit-content',
              position: 'relative',
              marginBottom: '20px',
            }}
          >
            Newsletter
            <div
              className="underline"
              style={{
                width: '100%',
                height: '3px',
                background: '#767676',
                borderRadius: '3px',
                position: 'absolute',
                top: '20px',
                left: '0',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: '0',
                  left: '10px',
                  width: '12px',
                  height: '100%',
                  background: '#fff',
                  borderRadius: '3px',
                  animation: 'moving 2s linear infinite',
                }}
              ></span>
            </div>
          </h3>
          <form
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid #ccc',
              marginBottom: '30px',
            }}
          >
            <label htmlFor="email" className="visually-hidden" style={{ display: 'none' }}>
              Enter your email address:
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email id"
              required
              style={{
                width: '100%',
                background: 'transparent',
                border: '0',
                outline: 'none',
                color: '#ccc',
                fontSize: '14px',
              }}
            />
            <button
              type="submit"
              aria-label="Submit email"
              style={{
                background: 'transparent',
                border: '0',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <i
                className="fa-solid fa-arrow-right"
                style={{
                  color: '#ccc',
                  fontSize: '14px',
                }}
              ></i>
            </button>
          </form>

          <div className="social-icons">
            <i
              className="fa-brands fa-facebook"
              style={{
                cursor: 'pointer',
                width: '35px',
                height: '35px',
                borderRadius: '50%',
                background: '#fff',
                color: '#000',
                marginRight: '12px',
                textAlign: 'center',
                lineHeight: '35px',
                fontSize: '18px',
              }}
            ></i>
            <i
              className="fa-brands fa-twitter"
              style={{
                cursor: 'pointer',
                width: '35px',
                height: '35px',
                borderRadius: '50%',
                background: '#fff',
                color: '#000',
                marginRight: '12px',
                textAlign: 'center',
                lineHeight: '35px',
                fontSize: '18px',
              }}
            ></i>
            <i
              className="fa-brands fa-linkedin"
              style={{
                cursor: 'pointer',
                width: '35px',
                height: '35px',
                borderRadius: '50%',
                background: '#fff',
                color: '#000',
                marginRight: '12px',
                textAlign: 'center',
                lineHeight: '35px',
                fontSize: '18px',
              }}
            ></i>
          </div>
        </div>
      </div>

      <hr
        style={{
          border: '0',
          width: '90%',
          borderBottom: '1px solid #ccc',
          margin: '15px auto',
        }}
      />
      <p
        className="copyright"
        style={{
          textAlign: 'center',
          fontSize: '12px',
        }}
      >
        © 2025 Moringa School. All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
