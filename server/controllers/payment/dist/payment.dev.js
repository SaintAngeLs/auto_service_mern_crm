"use strict";

var stripeModule = require('stripe');

var stripe = stripeModule(process.env.STRIPE_PRIVATE_KEY);

var add = function add(req, res) {
  var session;
  return regeneratorRuntime.async(function add$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: req.body.items.map(function (item) {
              return {
                price_data: {
                  currency: "usd",
                  product_data: {
                    name: item.name
                  },
                  unit_amount: item.price * 100
                },
                quantity: item.quantity
              };
            }),
            success_url: "https://course-pro-seven.vercel.app",
            cancel_url: "https://course-pro-seven.vercel.app"
          }));

        case 3:
          session = _context.sent;
          res.json({
            url: session.url
          });
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            error: _context.t0.message
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

module.exports = {
  add: add
};