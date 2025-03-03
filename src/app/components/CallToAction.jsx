"use client";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState, useEffect } from "react";

export default function CallToAction() {
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [userCountry, setUserCountry] = useState();
   
  const fetchUserCountry = async () => {
      try {
          const response = await fetch("https://api.ipify.org?format=json");
          const data = await response.json();
          const userIP = data.ip;

          const countryResponse = await fetch(
              `https://ipapi.co/${userIP}/country/`
          );
          const country = await countryResponse.text();

          setUserCountry(country);
      } catch (error) {
          console.error("Error fetching user country:", error);
      }
  };
 

  useEffect(() => {
      fetchUserCountry();
  }, []); // Fetch user country once when the component mounts

  const handleSubmit = async () => {
    let posts = null;
    try {
      const result = await fetch("http://localhost:3000/api/optin", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          name: name,
          country: userCountry,
        }),
        // cache: 'no-store',
      });
    //   const data = await result.json();
    //   posts = data.posts;
      setOpenModal(false);
    } catch (error) {
      console.log("Error getting post:", error);
    }
  };

  function onCloseModal() {
    setOpenModal(false);
    setEmail("");
  }

  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <h2>
        Sign up for the Newsletter to stay up to date on new posts and discounts
        and deals on your favorite products
      </h2>
      <Button
        gradientDuoTone="purpleToPink"
        className="rounded-tl-xl rounded-bl-none"
        onClick={() => setOpenModal(true)}
      >
        Join The Newsletter
      </Button>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Sign in to our platform
            </h3>
            <div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="firstname" value="Your Name" />
                </div>
                <TextInput
                  id="firstname"
                  type="text"
                  required
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput
                id="email"
                placeholder="name@company.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div className="w-full">
              <Button onClick={handleSubmit}>Register</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
