import { useState } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

function Collaborator() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && (
        <Modal isOpen={true} onClose={() => setIsOpen(false)}>
          <ModalContent />
        </Modal>
      )}
      <div className="w-full h-auto p-7 border border-grey-ef rounded-md">
        <div className="mb-4 flex flex-col md:flex-row md:justify-between md:items-center">
          <div>
            <h2 className="font-bold text-[24px] text-grey-2c leading-none">Team Members</h2>
            <p className="font-light text-grey-91 text-[14px]">
              Manage who has access to your brand
            </p>
          </div>
          <button
            onClick={() => {
              setIsOpen(true);
            }}
            className="px-5 py-2 border border-grey-2c hover:bg-grey-2c hover:text-white active:bg-grey-2c active:text-white rounded-[8px] flex font-semibold justify-center mt-[8px] md:mt-0"
            type="submit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 mr-[2px] md:mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
              />
            </svg>
            Invite People
          </button>
        </div>
        <div>
          <div className="border-b-2 border-grey-ef">
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-4">
                <div className="h-8 w-8 text-[12px] md:text-[16px] md:h-10 md:w-10 rounded-full bg-grey-2c font-bold uppercase flex items-center justify-center text-white">
                  JD
                </div>
                <div>
                  <p className="text-grey-2c capitalize font-semibold leading-none text-[14px] md:text-[16px]">John Doe</p>
                  <p className="text-muted-foreground text-grey-91 text-[12px] md:text-[14px]">john@hiku.com</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-blue-cc text-blue-dd font-semibold text-[8px] uppercase px-2 py-1 rounded-full">
                  Admin
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5 text-grey-2c hover:cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="border-b-2 border-grey-ef">
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-4">
                <div className="h-8 w-8 text-[12px] md:text-[16px] md:h-10 md:w-10 rounded-full bg-grey-2c font-bold uppercase flex items-center justify-center text-white">
                  JD
                </div>
                <div>
                  <p className="text-grey-2c capitalize font-semibold leading-none text-[14px] md:text-[16px]">Max Doe</p>
                  <p className="text-muted-foreground text-grey-91 text-[12px] md:text-[14px]">max@hicu.com</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-blue-cc text-blue-dd font-semibold text-[8px] uppercase px-2 py-1 rounded-full">
                  Admin
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5 text-grey-2c hover:cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="">
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center gap-4">
                <div className="h-8 w-8 text-[12px] md:text-[16px] md:h-10 md:w-10 rounded-full bg-grey-2c font-bold uppercase flex items-center justify-center text-white">
                  JD
                </div>
                <div>
                  <p className="text-grey-2c capitalize font-semibold leading-none text-[14px] md:text-[16px]">Jane Doe</p>
                  <p className="text-muted-foreground text-grey-91 text-[12px] md:text-[14px]">jane@hicu.com</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-blue-cc text-blue-dd font-semibold text-[8px] uppercase px-2 py-1 rounded-full">
                  Admin
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5 text-grey-2c hover:cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Collaborator;

function ModalContent() {
  return (
    <>
      {" "}
      <div>
        <h2 className="font-bold text-md">Invite Team Members</h2>
        <p className="text-gray-500 text-sm">
          Invite users to join your brand. They will receive an email
          invitation.
        </p>
      </div>
      <div className="flex flex-col my-8">
        <label>Email Addresses</label>
        <textarea
          className="w-full border p-2 rounded-md mt-2"
          placeholder="Enter email addresses (one per line)"
        ></textarea>
        <p className="text-gray-500 text-sm">
          Enter multiple email addresses separated by line breaks
        </p>
      </div>
      <div className="flex flex-col my-8">
        <label>Role</label>
        <select className="w-full border p-2 rounded-md mt-2">
          <option>Admin</option>
          <option selected>Member</option>
        </select>
      </div>
      <div className="flex items-center my-4">
        <input type="checkbox"></input>
        <label className="text-sm ml-2">Send me a copy of the invitation</label>
      </div>
      <div className="flex justify-between items-center">
        <Button>Cancel</Button>
        <Button className="text-white bg-blue-500">Send Invitations</Button>
      </div>
    </>
  );
}
