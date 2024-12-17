-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "modulePermissions" TEXT[],
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Profile" (
    "profileId" TEXT NOT NULL,
    "profilePhoto" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "gender" TEXT,
    "depertment" TEXT,
    "experience" TEXT,
    "licenseNo" TEXT,
    "licenseFile" TEXT[],
    "preferredLocations" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("profileId")
);

-- CreateTable
CREATE TABLE "Address" (
    "addressId" TEXT NOT NULL,
    "addressLine1" TEXT,
    "addressLine2" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zipcode" TEXT,
    "country" TEXT,
    "fullAddress" TEXT,
    "isDefault" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("addressId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- CreateIndex
CREATE INDEX "User_phoneNumber_idx" ON "User"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_profileId_key" ON "Profile"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Address_addressId_key" ON "Address"("addressId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
