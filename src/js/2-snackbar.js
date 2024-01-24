const registerForm = document.querySelector(".form");

registerForm.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
/*   const login = form.elements.login.value;
  const password = form.elements.password.value; */
  
/*   if (login === "" || password === "") {
    return console.log("Please fill in all the fields!");
  } */

/*   */
  form.reset();
}
const makePromise = ({ value, delay, shouldResolve = true }) => {
    return new Promise((resolve, reject) => {
         setTimeout(() => {
                  if(shouldResolve) {
                      resolve(value)
                  } else {
                      reject(value)
                  }
              }, delay);
    });
  };

  makePromise({ value: "A", delay: 1000 })
	.then(value => console.log(value)) // "A"
	.catch(error => console.log(error));
