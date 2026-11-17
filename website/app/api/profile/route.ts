
import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { getApps, initializeApp } from "firebase-admin/app";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

function adminAuth() {
  const app =
    getApps()[0] ??
    initializeApp({
      projectId: "ph-match",
    });

  return getAuth(app);
}

async function verifyUser(request: NextRequest) {
  const header = request.headers.get("authorization") || "";
  const token = header.startsWith("Bearer ")
    ? header.slice(7)
    : "";

  if (!token) throw new Error("UNAUTHORIZED");

  const decoded = await adminAuth().verifyIdToken(token);

  return {
    uid: decoded.uid,
    email: decoded.email || "",
  };
}

function clean(value: unknown, max: number) {
  return typeof value === "string"
    ? value.trim().slice(0, max)
    : "";
}

export async function GET(request: NextRequest) {
  try {
    const user = await verifyUser(request);

    const member = await prisma.member.findUnique({
      where: { firebaseUid: user.uid },
      include: { profile: true },
    });

    if (!member?.profile) {
      return NextResponse.json({ profile: null });
    }

    const p = member.profile;

    return NextResponse.json({
      profile: {
        id: user.uid,
        full_name: p.fullName,
        username: p.username || "",
        location: p.location,
        bio: p.bio,
        relationship_intention: p.relationshipIntention,
        photoURL: p.photoUrl,
        isActive: p.isActive,
      },
    });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json(
        { error: "Sign-in required." },
        { status: 401 }
      );
    }

    console.error("Profile GET error:", error);

    return NextResponse.json(
      { error: "Unable to load profile." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await verifyUser(request);
    const body = await request.json();

    const fullName = clean(body.full_name, 120);
    const username = clean(body.username, 30);
    const location = clean(body.location, 120);
    const bio = clean(body.bio, 1000);
    const intention =
      clean(body.relationship_intention, 80) || "Marriage";
    const photoUrl = clean(body.photoURL, 2000);

    if (!fullName) {
      return NextResponse.json(
        { error: "Full name is required." },
        { status: 400 }
      );
    }

    if (
      username &&
      !/^[a-zA-Z0-9_]{3,30}$/.test(username)
    ) {
      return NextResponse.json(
        { error: "Invalid username." },
        { status: 400 }
      );
    }

    const profile = await prisma.$transaction(async (tx) => {
      await tx.member.upsert({
        where: { firebaseUid: user.uid },
        create: {
          firebaseUid: user.uid,
          email: user.email,
        },
        update: { email: user.email },
      });

      await tx.memberPrivate.upsert({
        where: { firebaseUid: user.uid },
        create: { firebaseUid: user.uid },
        update: {},
      });

      return tx.memberProfile.upsert({
        where: { firebaseUid: user.uid },
        create: {
          firebaseUid: user.uid,
          fullName,
          username: username || null,
          location,
          bio,
          relationshipIntention: intention,
          photoUrl,
          isActive: true,
        },
        update: {
          fullName,
          username: username || null,
          location,
          bio,
          relationshipIntention: intention,
          photoUrl,
          isActive: true,
        },
      });
    });

    return NextResponse.json({
      profile: {
        id: user.uid,
        full_name: profile.fullName,
        username: profile.username || "",
        location: profile.location,
        bio: profile.bio,
        relationship_intention: profile.relationshipIntention,
        photoURL: profile.photoUrl,
        isActive: profile.isActive,
      },
    });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json(
        { error: "Sign-in required." },
        { status: 401 }
      );
    }

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "That username is already in use." },
        { status: 409 }
      );
    }

    console.error("Profile POST error:", error);

    return NextResponse.json(
      { error: "Unable to save profile." },
      { status: 500 }
    );
  }
}
