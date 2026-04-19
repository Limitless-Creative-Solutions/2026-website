import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", agency: "Limitless Creative Solutions", version: "2026.1" });
  });

  // Mock Stripe Webhook
  app.post("/api/webhooks/stripe", (req, res) => {
    console.log("Stripe Webhook Received:", req.body);
    res.json({ received: true });
  });

  // Mock PayHere Webhook
  app.post("/api/webhooks/payhere", (req, res) => {
    console.log("PayHere Webhook Received:", req.body);
    res.json({ received: true });
  });

  // Quotation Generator API
  app.post("/api/quote", (req, res) => {
    const { name, service, budget } = req.body;
    // Real logic would calculate here
    res.json({ 
      quoteId: `LCC-${Math.floor(Math.random() * 10000)}`,
      estimate: budget ? `Calculated based on ${budget}` : "Consultation required",
      status: "Generated"
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Production-ready server running on http://localhost:${PORT}`);
  });
}

startServer();
