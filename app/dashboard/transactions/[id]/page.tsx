'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Transaction } from '@/types/transaction';

export default function TransactionDetailsPage() {
  const { id } = useParams();
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTransactionDetails() {
      try {
        const response = await fetch(`/api/transactions/${id}`);
        const data: Transaction = await response.json();
        setTransaction(data);
      } catch (error) {
        console.error('Erro ao buscar detalhes da transação:', error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchTransactionDetails();
    }
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (!transaction) return <p>Transação não encontrada.</p>;

  return (
    <div className='text-[0.9rem] text-gray-900'>
      <h1 className='text-2xl font-bold mb-4'>Detalhes da Transação</h1>

      {/* Informações do Cliente */}
      <div className='bg-white shadow-md rounded-lg p-4 mb-4'>
        <h2 className='text-lg font-semibold mb-4'>Informações do Cliente</h2>
        <div className='flex justify-between py-2 border-b-1 border-gray-100'>
          <p className='font-bold'>Nome</p>
          <p className='text-gray-500'>
            {transaction.customer.firstName} {transaction.customer.lastName}
          </p>
        </div>

        <div className='flex justify-between py-2 border-b-1 border-gray-100'>
          <p className='font-bold'>Documento</p>
          <p className='text-gray-500'>
            {transaction.customer.document.type.toUpperCase()} -{' '}
            {transaction.customer.document.number}
          </p>
        </div>

        <div className='flex justify-between py-2 border-gray-100'>
          <p className='font-bold'>Endereço</p>
          <p className='text-gray-500'>
            {transaction.customer.address.street},{' '}
            {transaction.customer.address.number},{' '}
            {transaction.customer.address.neighborhood},{' '}
            {transaction.customer.address.city} -{' '}
            {transaction.customer.address.state},{' '}
            {transaction.customer.address.country}
          </p>
        </div>
      </div>

      {/* Itens da Compra */}
      <div className='bg-white shadow-md rounded-lg p-4 mb-4'>
        <h2 className='text-lg font-semibold mb-4'>Itens da Compra</h2>
        <div className='overflow-x-auto rounded-lg text-sm'>
          <table className='min-w-full'>
            <thead className='bg-gray-50 font-semibold text-[0.7rem]'>
              <tr>
                <th className='px-4 py-2 text-left tracking-wider text-gray-500 uppercase'>
                  Nome do Produto
                </th>
                <th className='px-4 py-2 text-left tracking-wider text-gray-500 uppercase'>
                  Quantidade
                </th>
                <th className='px-4 py-2 text-left tracking-wider text-gray-500 uppercase'>
                  Preço
                </th>
                <th className='px-4 py-2 text-left tracking-wider text-gray-500 uppercase'>
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {transaction.items.map((item, index) => (
                <tr
                  key={index}
                  className='even:bg-gray-50 odd:bg-white even:border text-gray-500 even:border-gray-100'
                >
                  <td className='px-4 py-2 text-left font-semibold text-gray-900'>
                    {item.name}
                  </td>
                  <td className='px-4 py-2 text-left'>{item.quantity}</td>
                  <td className='px-4 py-2 text-left'>
                    {item.amount / item.quantity}
                  </td>
                  <td className='px-4 py-2 text-left'>{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Informações do Pagamento */}
      <div className='bg-white shadow-md rounded-lg p-4 mb-4'>
        <h2 className='text-lg font-semibold mb-4'>Informações de Pagamento</h2>
        <div className='flex justify-between py-2 border-b-1 border-gray-100'>
          <p className='font-bold'>Parcelas</p>
          <p className='text-gray-500'>
            {transaction.paymentMethod.card.installments}
          </p>
        </div>

        <div className='flex justify-between py-2 border-b-1 border-gray-100'>
          <p className='font-bold'>Cartão</p>
          <p className='text-gray-500'>
            {transaction.paymentMethod.card.firstDigits} **** ****{' '}
            {transaction.paymentMethod.card.lastDigits}
          </p>
        </div>

        <div className='flex justify-between py-2 border-gray-100'>
          <p className='font-bold'>Titular</p>
          <p className='text-gray-500'>
            {transaction.paymentMethod.card.holderName}
          </p>
        </div>

        <div className='flex justify-between py-2 border-gray-100'>
          <p className='font-bold'>Expiração</p>
          <p className='text-gray-500'>
            {transaction.paymentMethod.card.expirationDate}
          </p>
        </div>
      </div>
    </div>
  );
}
