import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { UserForm } from "./UserForm";
import createComponent from "react-unit";

Enzyme.configure({ adapter: new Adapter() });

let user = {
  id: 1,
  name: "Mark Zuckerburg",
  address: "Facebook, 12, Silicon Vally",
  country: "USA",
  phoneNumber: "123-4567-8915",
  profilePhoto: "abcd"
};

function setup(MODE, user) {
  const props = {
    location: {
      state: { MODE, user }
    }
  };

  const wrapper = shallow(<UserForm {...props} />);
  return {
    props,
    wrapper
  };
}

describe("User Form Component", () => {
  const { wrapper } = setup("EDIT", user);

  describe("UI Element rendering", () => {
    it("should render name input", () => {
      const input = wrapper.find(`[name='name']`);
      expect(input.length).toBe(1);
    });

    it("should render name address", () => {
      const input = wrapper.find(`[name='address']`);
      expect(input.length).toBe(1);
    });

    it("should render country input", () => {
      const input = wrapper.find(`[name='country']`);
      expect(input.length).toBe(1);
    });

    it("should render phoneNumber input", () => {
      const input = wrapper.find(`[name='phoneNumber']`);
      expect(input.length).toBe(1);
    });
  });

  describe("validations", () => {
    let file = {
      name: "Screenshot (119).png",
      size: 88731,
      type: "image/png",
      webkitRelativePath: ""
    };
    it("should return value on change event", () => {
      wrapper
        .find(`[name='name']`)
        .simulate("change", { target: { value: "HI", name: "name" } });
      expect(wrapper.state().formGroup.name).toBe("HI");
    });

    it("should show error when required field is empty", () => {
      wrapper
        .find(`[name='name']`)
        .simulate("change", { target: { value: "", name: "name" } });
      expect(wrapper.state().formErrors.name).toBe("name is required");
    });

    it("should validate phone number", () => {
      wrapper
        .find(`[name='phoneNumber']`)
        .simulate("change", { target: { value: "000", name: "phoneNumber" } });
      expect(wrapper.state().formErrors.phoneNumber).toBeTruthy();
    });

    it("should validate file upload", () => {
      wrapper
        .find(`[name='profilePhoto']`)
        .simulate("change", { target: { files: [file], name: "phoneNumber" } });
      expect(wrapper.state().formErrors.profilePhoto).toBeTruthy();
    });
  });
});
