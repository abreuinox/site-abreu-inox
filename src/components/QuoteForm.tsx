"use client";

import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";
import { WhatsAppIcon } from "./icons";

type Props = {
  whatsappNumber: string;
  services: string[];
};

export const clientTypes = [
  "Residência",
  "Condomínio",
  "Empresa privada",
  "Construtora, arquitetura ou engenharia",
  "Órgão público ou instituição",
  "Outro",
];

const deadlines = ["O quanto antes", "Em até 30 dias", "De 1 a 3 meses", "Sem prazo definido"];

/** Perfis aceitos em /orcamento/?perfil=... (links das outras páginas). */
const profileParam: Record<string, string> = {
  residencia: "Residência",
  condominio: "Condomínio",
  empresa: "Empresa privada",
  arquitetura: "Construtora, arquitetura ou engenharia",
  publico: "Órgão público ou instituição",
};

type Fields = {
  nome: string;
  empresa: string;
  telefone: string;
  email: string;
  perfil: string;
  servico: string;
  local: string;
  prazo: string;
  descricao: string;
  anexos: boolean;
};

type Errors = Partial<Record<keyof Fields, string>>;

const empty: Fields = {
  nome: "",
  empresa: "",
  telefone: "",
  email: "",
  perfil: "",
  servico: "",
  local: "",
  prazo: "",
  descricao: "",
  anexos: false,
};

function validate(fields: Fields): Errors {
  const errors: Errors = {};
  if (fields.nome.trim().length < 2) errors.nome = "Informe o seu nome.";
  const digits = fields.telefone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 13) errors.telefone = "Informe um telefone com DDD.";
  if (fields.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim()))
    errors.email = "Confira o e-mail ou deixe o campo em branco.";
  if (!fields.perfil) errors.perfil = "Escolha o tipo de cliente.";
  if (!fields.servico) errors.servico = "Escolha o serviço de interesse.";
  if (fields.local.trim().length < 2) errors.local = "Informe a cidade ou a região da obra.";
  if (fields.descricao.trim().length < 10)
    errors.descricao = "Descreva a necessidade em pelo menos uma frase.";
  return errors;
}

function buildMessage(fields: Fields): string {
  // Campos opcionais vazios viram null e saem da mensagem; "" é linha em branco.
  const optional = (label: string, value: string) => (value.trim() ? `*${label}:* ${value.trim()}` : null);
  const lines = [
    "Olá! Gostaria de solicitar um orçamento pelo site da Abreu Inox.",
    "",
    `*Nome:* ${fields.nome.trim()}`,
    optional("Empresa ou órgão", fields.empresa),
    `*Telefone/WhatsApp:* ${fields.telefone.trim()}`,
    optional("E-mail", fields.email),
    `*Tipo de cliente:* ${fields.perfil}`,
    `*Serviço:* ${fields.servico}`,
    `*Local da obra:* ${fields.local.trim()}`,
    optional("Prazo desejado", fields.prazo),
    "",
    `*Descrição:* ${fields.descricao.trim()}`,
    ...(fields.anexos ? ["", "Vou enviar fotos, plantas ou documentos nesta conversa."] : []),
  ];
  return lines.filter((line) => line !== null).join("\n");
}

const inputClass =
  "mt-2 block w-full rounded-xl border border-white/20 bg-coal px-4 py-3 text-base text-paper placeholder:text-steel-dim focus:border-paper aria-[invalid=true]:border-red-400";
const labelClass = "block text-sm font-semibold";

export function QuoteForm({ whatsappNumber, services }: Props) {
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [sentUrl, setSentUrl] = useState<string | null>(null);

  // Pré-preenche serviço e perfil quando o visitante chega de outra página.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const servico = params.get("servico");
    const perfil = profileParam[params.get("perfil") ?? ""];
    setFields((current) => ({
      ...current,
      servico: servico && services.includes(servico) ? servico : current.servico,
      perfil: perfil ?? current.perfil,
    }));
  }, [services]);

  function update<K extends keyof Fields>(key: K, value: Fields[K]) {
    setFields((current) => ({ ...current, [key]: value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate(fields);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      document.getElementById(`orcamento-${firstInvalid}`)?.focus();
      return;
    }
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(buildMessage(fields))}`;
    // Só dados não pessoais vão para a medição.
    track("submit_quote", {
      client_type: fields.perfil,
      service: fields.servico,
      deadline: fields.prazo || undefined,
      has_attachments: fields.anexos ? "sim" : "nao",
    });
    setSentUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function field(key: keyof Fields) {
    const error = errors[key];
    return {
      id: `orcamento-${key}`,
      name: key,
      "aria-invalid": error ? true : undefined,
      "aria-describedby": error ? `orcamento-${key}-erro` : undefined,
    };
  }

  function errorText(key: keyof Fields) {
    return errors[key] ? (
      <p id={`orcamento-${key}-erro`} className="mt-1.5 text-sm text-red-300">
        {errors[key]}
      </p>
    ) : null;
  }

  if (sentUrl) {
    return (
      <div role="status" className="rounded-2xl border border-line bg-graphite p-7 sm:p-8">
        <p className="font-display text-2xl font-bold">Seu briefing está pronto</p>
        <p className="mt-3 leading-relaxed text-steel">
          Abrimos o WhatsApp da Abreu Inox com as informações preenchidas. Para concluir a
          solicitação, envie a mensagem na conversa{fields.anexos ? " e anexe as fotos, plantas ou documentos" : ""}.
        </p>
        <p className="mt-3 leading-relaxed text-steel-dim">
          Se o WhatsApp não abriu, use o botão abaixo.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href={sentUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="formulario-reenvio"
            className="surface-steel inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-4 font-semibold"
          >
            <WhatsAppIcon className="size-5" />
            Abrir o WhatsApp
          </a>
          <button
            type="button"
            onClick={() => setSentUrl(null)}
            className="inline-flex items-center justify-center rounded-full border border-white/25 px-7 py-4 font-semibold hover:border-white/60"
          >
            Editar o briefing
          </button>
        </div>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      <div>
        <label htmlFor="orcamento-nome" className={labelClass}>
          Nome *
        </label>
        <input {...field("nome")} type="text" autoComplete="name" required value={fields.nome} onChange={(e) => update("nome", e.target.value)} className={inputClass} />
        {errorText("nome")}
      </div>
      <div>
        <label htmlFor="orcamento-empresa" className={labelClass}>
          Empresa ou órgão <span className="font-normal text-steel-dim">(opcional)</span>
        </label>
        <input {...field("empresa")} type="text" autoComplete="organization" value={fields.empresa} onChange={(e) => update("empresa", e.target.value)} className={inputClass} />
      </div>
      <div>
        <label htmlFor="orcamento-telefone" className={labelClass}>
          Telefone ou WhatsApp *
        </label>
        <input {...field("telefone")} type="tel" inputMode="tel" autoComplete="tel" placeholder="(61) 90000-0000" required value={fields.telefone} onChange={(e) => update("telefone", e.target.value)} className={inputClass} />
        {errorText("telefone")}
      </div>
      <div>
        <label htmlFor="orcamento-email" className={labelClass}>
          E-mail <span className="font-normal text-steel-dim">(opcional)</span>
        </label>
        <input {...field("email")} type="email" inputMode="email" autoComplete="email" value={fields.email} onChange={(e) => update("email", e.target.value)} className={inputClass} />
        {errorText("email")}
      </div>
      <div>
        <label htmlFor="orcamento-perfil" className={labelClass}>
          Tipo de cliente *
        </label>
        <select {...field("perfil")} required value={fields.perfil} onChange={(e) => update("perfil", e.target.value)} className={inputClass}>
          <option value="">Selecione</option>
          {clientTypes.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        {errorText("perfil")}
      </div>
      <div>
        <label htmlFor="orcamento-servico" className={labelClass}>
          Serviço de interesse *
        </label>
        <select {...field("servico")} required value={fields.servico} onChange={(e) => update("servico", e.target.value)} className={inputClass}>
          <option value="">Selecione</option>
          {services.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        {errorText("servico")}
      </div>
      <div>
        <label htmlFor="orcamento-local" className={labelClass}>
          Cidade ou local da obra *
        </label>
        <input {...field("local")} type="text" autoComplete="address-level2" placeholder="Ex.: Águas Claras, DF" required value={fields.local} onChange={(e) => update("local", e.target.value)} className={inputClass} />
        {errorText("local")}
      </div>
      <div>
        <label htmlFor="orcamento-prazo" className={labelClass}>
          Prazo desejado <span className="font-normal text-steel-dim">(opcional)</span>
        </label>
        <select {...field("prazo")} value={fields.prazo} onChange={(e) => update("prazo", e.target.value)} className={inputClass}>
          <option value="">Selecione</option>
          {deadlines.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="orcamento-descricao" className={labelClass}>
          Descreva a necessidade *
        </label>
        <textarea {...field("descricao")} rows={5} required placeholder="Ex.: corrimão de parede para escada interna com dois lances, cerca de 6 metros, acabamento escovado." value={fields.descricao} onChange={(e) => update("descricao", e.target.value)} className={inputClass} />
        {errorText("descricao")}
      </div>
      <div className="sm:col-span-2">
        <label className="flex min-h-11 items-start gap-3 text-steel">
          <input type="checkbox" name="anexos" checked={fields.anexos} onChange={(e) => update("anexos", e.target.checked)} className="mt-1 size-5 shrink-0 accent-paper" />
          Tenho fotos, plantas ou documentos para enviar (você poderá anexá-los na conversa do WhatsApp).
        </label>
      </div>
      <div className="sm:col-span-2">
        <button type="submit" className="surface-steel inline-flex w-full items-center justify-center gap-2.5 rounded-full px-7 py-4 font-semibold sm:w-auto">
          <WhatsAppIcon className="size-5" />
          Enviar briefing pelo WhatsApp
        </button>
        <p className="mt-3 text-sm leading-relaxed text-steel-dim">
          Ao enviar, o WhatsApp abre com a mensagem pronta. Os dados não ficam armazenados no site.
        </p>
      </div>
    </form>
  );
}
