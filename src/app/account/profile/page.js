"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, User, Camera, Save, X } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "Helmi Said",
    lastName: "Hidayatulloh",
    email: "helmi@gmail.com",
    phone: "+62 812-3456-7890",
    dateOfBirth: "1995-06-15",
    gender: "male",
    address: "Jl. Sudirman No. 123",
    city: "Jakarta",
    province: "DKI Jakarta",
    postalCode: "12190",
    bio: "Pecinta alam dan petualangan outdoor. Suka mendaki gunung dan eksplorasi tempat-tempat baru.",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    // Simulate save
    console.log("Saving profile data:", formData);
    setIsEditing(false);
    // Here you would typically make an API call to save the data
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data to original values if needed
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Breadcrumbs */}
        <div className="bg-gray-50 py-3">
          <div className="container mx-auto px-4">
            <div className="flex items-center text-sm text-gray-500">
              <Link href="/" className="hover:text-gray-600">
                Beranda
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <Link href="/account" className="hover:text-gray-600">
                Akun
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span className="text-gray-700">Profil</span>
            </div>
          </div>
        </div>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-3xl font-bold">Profil Saya</h1>
                  <p className="text-gray-500 mt-1">
                    Kelola informasi personal Anda
                  </p>
                </div>
                {!isEditing ? (
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="bg-black hover:bg-gray-800 text-white"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Edit Profil
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      onClick={handleCancel}
                      variant="outline"
                      className="border-gray-300 hover:bg-gray-50"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Batal
                    </Button>
                    <Button
                      onClick={handleSave}
                      className="bg-black hover:bg-gray-800 text-white"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Simpan
                    </Button>
                  </div>
                )}
              </div>

              {/* Profile Form */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                {/* Avatar Section */}
                <div className="flex items-center gap-6 mb-8 pb-6 border-b border-gray-100">
                  <div className="relative">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100">
                      <Image
                        src="/images/article/helmi_avatar.jpg"
                        alt="Profile"
                        fill
                        className="object-cover"
                      />
                    </div>
                    {isEditing && (
                      <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                        <Camera className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">
                      {formData.firstName} {formData.lastName}
                    </h3>
                    <p className="text-gray-500">{formData.email}</p>
                    {isEditing && (
                      <p className="text-sm text-gray-400 mt-1">
                        Klik ikon kamera untuk mengubah foto profil
                      </p>
                    )}
                  </div>
                </div>

                {/* Personal Information */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Informasi Personal
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">Nama Depan</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) =>
                            handleInputChange("firstName", e.target.value)
                          }
                          disabled={!isEditing}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Nama Belakang</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) =>
                            handleInputChange("lastName", e.target.value)
                          }
                          disabled={!isEditing}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          disabled={!isEditing}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Nomor Telepon</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          disabled={!isEditing}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="dateOfBirth">Tanggal Lahir</Label>
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={(e) =>
                            handleInputChange("dateOfBirth", e.target.value)
                          }
                          disabled={!isEditing}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="gender">Jenis Kelamin</Label>
                        <Select
                          value={formData.gender}
                          onValueChange={(value) =>
                            handleInputChange("gender", value)
                          }
                          disabled={!isEditing}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Pilih jenis kelamin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Laki-laki</SelectItem>
                            <SelectItem value="female">Perempuan</SelectItem>
                            <SelectItem value="other">Lainnya</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Address Information */}
                  <div className="pt-6 border-t border-gray-100">
                    <h3 className="text-lg font-semibold mb-4">Alamat</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="address">Alamat Lengkap</Label>
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) =>
                            handleInputChange("address", e.target.value)
                          }
                          disabled={!isEditing}
                          className="mt-1"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="city">Kota</Label>
                          <Input
                            id="city"
                            value={formData.city}
                            onChange={(e) =>
                              handleInputChange("city", e.target.value)
                            }
                            disabled={!isEditing}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="province">Provinsi</Label>
                          <Select
                            value={formData.province}
                            onValueChange={(value) =>
                              handleInputChange("province", value)
                            }
                            disabled={!isEditing}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Pilih provinsi" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="DKI Jakarta">
                                DKI Jakarta
                              </SelectItem>
                              <SelectItem value="Jawa Barat">
                                Jawa Barat
                              </SelectItem>
                              <SelectItem value="Jawa Timur">
                                Jawa Timur
                              </SelectItem>
                              <SelectItem value="Jawa Tengah">
                                Jawa Tengah
                              </SelectItem>
                              <SelectItem value="Yogyakarta">
                                Yogyakarta
                              </SelectItem>
                              <SelectItem value="Bali">Bali</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="postalCode">Kode Pos</Label>
                          <Input
                            id="postalCode"
                            value={formData.postalCode}
                            onChange={(e) =>
                              handleInputChange("postalCode", e.target.value)
                            }
                            disabled={!isEditing}
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="pt-6 border-t border-gray-100">
                    <h3 className="text-lg font-semibold mb-4">Bio</h3>
                    <div>
                      <Label htmlFor="bio">Tentang Saya</Label>
                      <Textarea
                        id="bio"
                        value={formData.bio}
                        onChange={(e) =>
                          handleInputChange("bio", e.target.value)
                        }
                        disabled={!isEditing}
                        className="mt-1"
                        rows={4}
                        placeholder="Ceritakan sedikit tentang diri Anda..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
