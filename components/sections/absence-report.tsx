'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

export function AbsenceReport() {
  const [isAbsent, setIsAbsent] = useState(false);
  const [reason, setReason] = useState('');
  const [customReason, setCustomReason] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalReason = reason === 'other' ? customReason : reason;
    
    toast({
      title: 'Absence Reported',
      description: `Your absence has been recorded. Reason: ${finalReason}`,
    });

    setIsAbsent(false);
    setReason('');
    setCustomReason('');
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Report Absence</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="absence-status">Mark as Absent</Label>
            <Switch
              id="absence-status"
              checked={isAbsent}
              onCheckedChange={setIsAbsent}
            />
          </div>

          {isAbsent && (
            <>
              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Absence</Label>
                <Select
                  value={reason}
                  onValueChange={setReason}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sick">Sick Leave</SelectItem>
                    <SelectItem value="emergency">Personal Emergency</SelectItem>
                    <SelectItem value="professional">Professional Development</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {reason === 'other' && (
                <div className="space-y-2">
                  <Label htmlFor="custom-reason">Specify Reason</Label>
                  <Textarea
                    id="custom-reason"
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                    placeholder="Please specify your reason for absence"
                    required
                  />
                </div>
              )}

              <Button type="submit">Submit Absence Report</Button>
            </>
          )}
        </form>
      </CardContent>
    </Card>
  );
}