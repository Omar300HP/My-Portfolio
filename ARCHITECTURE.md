# Portfolio Architecture

## Overview

This is a Single Page Application (SPA) built with Next.js (Pages Directory). It serves as a personal portfolio to display skills, projects, and contact information.

## System Design

- **Frontend**: Next.js (React) handles routing and UI rendering.
- **Styling**: Tailwind CSS provides the base styling system, augmented by Ant Design for complex interactive components.
- **Deployment**: Design to be deployed on static hosting (e.g., Vercel, Netlify) or as a Node.js process.

## Directory Structure

- `src/pages`: Next.js file-based routing.
- `src/components`: Reusable UI components.
- `public/`: Static files (images, fonts).

## Data Flow

- Content is primarily static or hardcoded within components.
- Contact forms (if any) may interact with external APIs or email services.
