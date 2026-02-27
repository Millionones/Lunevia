'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import ThemeProvider from '../theme/ThemeProvider';
import AppLayout from '../../components/Layout/AppLayout';
import DataTable, { Column } from '../../components/Table/DataTable';
import CustomModal from '../../components/Modal/CustomModal';
import { authCookies } from '../../lib/authCookies';
import api from '../../lib/apiClient';
import { useAppSelector } from '../store';

interface Lead {
  id: string;
  fullName: string;
  designation?: string;
  organization: string;
  email: string;
  contactNumber?: string;
  country?: string;
  projectTitle: string;
  deliveryTimeline: string;
  budgetRange?: string;
  referralSource?: string;
  status: string;
  createdAt: string;
}

export default function LeadsPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [totalLeads, setTotalLeads] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const access = useAppSelector((state) => state.auth.access)
  useEffect(() => {
    const token = authCookies.getToken();
    if (!token) {
      router.push('/login');
      return;
    }
    if (!access.includes('lead_control')) router.back();
  }, [router]);

  // debounce search input to avoid spamming the API
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm.trim());
      setPage(0);
    }, 400);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    const token = authCookies.getToken();
    if (!token) return;
    fetchLeads(page, rowsPerPage, debouncedSearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, debouncedSearch]);

  const fetchLeads = async (
    pageIndex: number,
    limit: number,
    search: string
  ) => {
    setLoading(true);
    try {
      const { data } = await api.get('/rfp', {
        params: {
          page: pageIndex + 1, // backend 1-based
          limit,
          search: search || undefined,
        },
      });

      // Shape:
      // { data: [...rfps], pagination: { page, limit, total, totalPages } }
      const items: any[] = data.data || [];
      const total: number = data.pagination?.total ?? items.length;

      const mapped: Lead[] = items.map((item: any) => ({
        id: String(item._id ?? item.id ?? ''),
        fullName: item.fullName,
        designation: item.designation,
        organization: item.organization,
        email: item.email,
        contactNumber: item.contactNumber,
        country: item.country,
        projectTitle: item.projectTitle,
        deliveryTimeline: item.deliveryTimeline,
        budgetRange: item.budgetRange,
        referralSource: item.referralSource,
        status: item.status ?? 'pending',
        createdAt: item.createdAt
          ? new Date(item.createdAt).toLocaleDateString()
          : '',
      }));

      setLeads(mapped);
      setTotalLeads(total);
    } catch (error) {
      // optional: you can add a toast/snackbar here
      console.error('Failed to load leads', error);
      setLeads([]);
      setTotalLeads(0);
    } finally {
      setLoading(false);
    }
  };

  const columns: Column[] = [
    { id: 'fullName', label: 'Full Name', minWidth: 180 },
    { id: 'email', label: 'Email', minWidth: 200 },
    { id: 'contactNumber', label: 'Contact Number', minWidth: 150 },
    { id: 'organization', label: 'Organization', minWidth: 180 },
    { id: 'projectTitle', label: 'Project Title', minWidth: 220 },
    {
      id: 'status',
      label: 'Status',
      minWidth: 120,
      format: (value: string) => (
        <Box
          sx={{
            display: 'inline-block',
            px: 1.5,
            py: 0.5,
            borderRadius: 1,
            bgcolor:
              value === 'Converted'
                ? 'success.light'
                : value === 'Qualified'
                  ? 'info.light'
                  : value === 'Contacted'
                    ? 'warning.light'
                    : 'grey.300',
            color: 'text.primary',
            fontSize: '0.875rem',
            fontWeight: 500,
          }}
        >
          {value}
        </Box>
      ),
    },
    { id: 'createdAt', label: 'Created At', minWidth: 120 },
    {
      id: 'actions',
      label: 'Actions',
      minWidth: 100,
      align: 'center',
      format: (_value: any, row?: Lead) => (
        <Button
          size="small"
          variant="outlined"
          onClick={() => {
            if (row) {
              router.push(`/leads/${row.id}`);
            }
          }}
        >
          View Details
        </Button>
      ),
    },
  ];

  return (
    <ThemeProvider>
      <AppLayout>
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <Typography variant="h6" paddingY={1}>Leads</Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => {
                setSelectedLead(null);
                setModalOpen(true);
              }}
            >
              Add Lead
            </Button>
          </Box>

          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              placeholder="Search leads by name, email, or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <DataTable
            columns={columns}
            rows={leads}
            loading={loading}
            page={page}
            rowsPerPage={rowsPerPage}
            totalRows={totalLeads}
            onPageChange={(newPage) => setPage(newPage)}
            onRowsPerPageChange={(newRowsPerPage) => {
              setRowsPerPage(newRowsPerPage);
              setPage(0);
            }}
          />

          <CustomModal
            open={modalOpen}
            onClose={() => {
              setModalOpen(false);
              setSelectedLead(null);
            }}
            title={selectedLead ? 'Lead Details' : 'Add New Lead'}
            maxWidth="md"
          >
            {selectedLead ? (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Full Name:</strong> {selectedLead.fullName}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Email:</strong> {selectedLead.email}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Contact Number:</strong>{' '}
                  {selectedLead.contactNumber || '-'}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Organization:</strong> {selectedLead.organization}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Project Title:</strong> {selectedLead.projectTitle}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Status:</strong> {selectedLead.status}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Referral Source:</strong>{' '}
                  {selectedLead.referralSource || '-'}
                </Typography>
                <Typography variant="body1">
                  <strong>Created At:</strong> {selectedLead.createdAt}
                </Typography>
              </Box>
            ) : (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Add new lead form would go here.
                </Typography>
              </Box>
            )}
          </CustomModal>
        </Box>
      </AppLayout>
    </ThemeProvider>
  );
}

