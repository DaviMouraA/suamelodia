'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"

export default function NewArtistPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    telefone: '',
    id_genero: '',
    eh_banda: false,
    ano_formacao: '',
    biografia: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/artists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        router.push('/artists')
      } else {
        // Handle errors
        console.error('Failed to create artist')
      }
    } catch (error) {
      console.error('An error occurred', error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Artist</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="nome"
            placeholder="Name"
            value={formData.nome}
            onChange={handleChange}
            required
          />
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            name="senha"
            type="password"
            placeholder="Password"
            value={formData.senha}
            onChange={handleChange}
            required
          />
          <Input
            name="telefone"
            placeholder="Phone"
            value={formData.telefone}
            onChange={handleChange}
          />
          <Select name="id_genero" value={formData.id_genero} onChange={handleChange}>
            <option value="">Select Genre</option>
            {/* Add genre options here */}
          </Select>
          <div>
            <label>
              <input
                type="checkbox"
                name="eh_banda"
                checked={formData.eh_banda}
                onChange={(e) => setFormData(prev => ({ ...prev, eh_banda: e.target.checked }))}
              />
              Is a band?
            </label>
          </div>
          <Input
            name="ano_formacao"
            type="number"
            placeholder="Year of Formation"
            value={formData.ano_formacao}
            onChange={handleChange}
          />
          <Textarea
            name="biografia"
            placeholder="Biography"
            value={formData.biografia}
            onChange={handleChange}
          />
          <Button type="submit">Create Artist</Button>
        </form>
      </CardContent>
    </Card>
  )
}
