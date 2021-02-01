const nodemailer = require("nodemailer");
const nodemailerSendgrid = require("nodemailer-sendgrid");

const transport = nodemailer.createTransport(
  nodemailerSendgrid({
    apiKey:
      "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",
  })
);

const sendOrderConfirmedEmail = (customer) => {
  const products = customer.products.map((prod) => {
    return (
      "<li>" +
      prod.name +
      ", Qty: " +
      prod.count +
      ", Price: " +
      prod.price +
      "</li>"
    );
  });
  transport
    .sendMail({
      from: "christian.johannesson@drakryggen.com",
      to: `${customer.firstname} <${customer.email}>`,
      subject: "Order confirmed",
      html: `<h1>Your order has been received!</h1>
        <p>Hi ${customer.firstname},</p>
        <p>We have received your order and will send it to you as soon as possible!</p>
        <p>Order details</p>
        <p><strong>Products</strong></p>
        <ul>${products}</ul>
        <p><strong>Address</strong></p>
        <p>${customer.street}</p>
        <p>${customer.zipCode}</p>
        <p>${customer.town}</p>
        <p>${customer.country}</p>`,
    })
    .then(() => console.log("confirmed email sent"))
    .catch((err) => console("confirmed email send error", err));
};

const sendOrderHandledEmail = (customer) => {
  const products = customer.products.map((prod) => {
    return (
      "<li>" +
      prod.name +
      ", Qty: " +
      prod.count +
      ", Price: " +
      prod.price +
      "</li>"
    );
  });
  transport
    .sendMail({
      from: "christian.johannesson@drakryggen.com",
      to: `${customer.firstname} <${customer.email}>`,
      subject: "Order handled",
      html: `<h1>Your order has been handled!</h1>
          <p>Hi ${customer.firstname},</p>
          <p>We have packed your order and it has left our warehouse! It will arrive at your supplied address shortly</p>
          <p>Order details</p>
          <p><strong>Products</strong></p>
          <ul>${products}</ul>
          <p><strong>Address</strong></p>
          <p>${customer.street}</p>
          <p>${customer.zipCode}</p>
          <p>${customer.town}</p>
          <p>${customer.country}</p>`,
    })
    .then(() => console.log("handled email sent"))
    .catch((err) => console("handled email send error", err));
};

exports.sendOrderConfirmedEmail = sendOrderConfirmedEmail;
exports.sendOrderHandledEmail = sendOrderHandledEmail;
